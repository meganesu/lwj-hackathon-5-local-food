
const Modal = ({ dialogRef }) => {
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
      <p>PUT SOME THINGS IN HERE</p>
      <button onClick={handleCheckIn}>Check in</button>
    </dialog>
  )
}

export default Modal;