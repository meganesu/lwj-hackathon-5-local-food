import "./Modal.css"

const Modal = ({ dialogRef, activeRestaurant, handleCheckIn }) => {
  const handleClose = () => {
    dialogRef.current.close();
  }

  return (
    <dialog ref={dialogRef}>
      <button
        id="closeButton"
        onClick={handleClose}
        aria-label="Close modal"
      >
        X
      </button>
      <h2>{activeRestaurant?.restaurantName}</h2>
      <p>{activeRestaurant?.address}</p>
      {
        !activeRestaurant?.visited ? (
          <button
            id="checkInButton"
            onClick={handleCheckIn}
          >
            Check in
          </button>
        )
        : (
          <p>You've already visited this restaurant! Well done!</p>
        )
      }
    </dialog>
  )
}

export default Modal;