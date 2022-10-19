import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import React, { Component } from 'react';

function DeleteListModal(props){

    const { hideDeleteListModal, title, confirmDeleteListModal, id } = props;
    return(
        <div class="modal" id="delete-list-modal" data-animation="slideInOutLeft">
          <div class="modal-root" id="verify-delete-list-root">
            <div class="modal-north">Delete playlist?</div>
                <div class="modal-center">
                  <div class="modal-center-content">
                    Are you sure you wish to permanently delete the&nbsp;
                    <span>{title}</span>
                    &nbsp; playlist?
                  </div>
                </div>
                <div class="modal-south">
                  <input
                    type="button"
                    id="delete-list-confirm-button"
                    class="modal-button"
                    value="Confirm"
                    onClick={confirmDeleteListModal}
                  />
                  <input
                    type="button"
                    id="delete-list-cancel-button"
                    class="modal-button"
                    value="Cancel"
                    onClick={hideDeleteListModal}
                  />
                </div>
              </div>
            </div>
    );
}
export default DeleteListModal;