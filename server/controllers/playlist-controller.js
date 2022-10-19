const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log(playlist);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}

updatePlaylistNameById = async (req,res) =>{
    let query = {_id: req.params.id}
    let newBody = req.body
    console.log(query);
    console.log(newBody.playlist.name);

    await Playlist.findByIdAndUpdate(newBody.playlist._id, {name: newBody.playlist.name}, function(err, docs) {
        console.log(newBody.playlist._id);
        console.log(newBody.playlist.name);
        if (err){
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }
        else{
            console.log("Updated Playlist : ", docs);
            return res.status(200).json({ success: true, playlist: docs })
        }
    });
}

updatePlaylistById = async (req, res) => {
    let query = { _id: req.params.id };
    let newBody = req.body;
    console.log(newBody.playlist.songs);

    await Playlist.findByIdAndUpdate(query, {songs: newBody.playlist.songs}, function(err, docs){
        if (err){
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }
        else{
            console.log("Updated Playlist : ", docs);
            return res.status(200).json({ success: true, playlist: docs })
        }
    });
  };



// updatePlaylistById = async (req, res) => {
//     console.log("ARE WE HEREEEE??");
//     let query = { _id: req.params.id };
//     let newBody = req.body

//     Playlist.findByIdAndUpdate(query, newBody).then(() => {
//         console.log("PLAYLIST:", newBody);
//         return res.status(201).json({
//             success: true,
//             message: 'Playlist Updated!',
//         });
//     })
//     .catch(error => {
//         return res.status(400).json({
//             error,
//             message: 'Playlist Not Updated!',
//         });
//     });
// };

deletePlaylistById = async (req, res) => {
    let query = { _id: req.params.id };

    Playlist.deleteOne(query).then(() => {
        return res.status(201).json({
            success: true,
            message: 'Playlist Deleted!',
        });
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Playlist Not Created!',
        });
    });
};

getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    updatePlaylistNameById,
    updatePlaylistById,
    deletePlaylistById
}