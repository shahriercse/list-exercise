import { Button } from '../Base/Button';
import Popup from 'reactjs-popup';

export default function DeletePopup({ open, closeModal, handleDelete, id }) {
  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="rounded-md bg-ashGray text-white">
        <span
          className="close flex justify-end cursor-pointer text-3xl pr-2 m-0"
          onClick={closeModal}
        >
          &times;
        </span>
        <div className="p-5">
          <p className="text-center text-lg font-semibold ">
            Are you sure want to delete this item ?
          </p>
          <div className="flex justify-end">
            <Button type="button" onClick={() => handleDelete(id)}>
              Yes
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
}
