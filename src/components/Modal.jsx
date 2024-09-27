
const Modal = ({ dialogRef, activeRestaurant }) => {
  const handleClose = () => {
    dialogRef.current.close();
  }

  const handleCheckIn = () => {
    dialogRef.current.close();
  }

  return (
    <dialog ref={dialogRef}>
      <button
        onClick={handleClose}
        aria-label="Close modal"
      >
        X
      </button>
      <h2>{activeRestaurant?.restaurantName}</h2>
      <p>{activeRestaurant?.address}</p>
      <button onClick={handleCheckIn}>Check in</button>
    </dialog>
  )
}

export default Modal;