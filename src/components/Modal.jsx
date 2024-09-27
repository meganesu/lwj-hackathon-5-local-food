
const Modal = ({ dialogRef }) => {

  return (
    <dialog ref={dialogRef}>
      <button aria-label="Close modal">X</button>
      <p>PUT SOME THINGS IN HERE</p>
      <button>Check in</button>
    </dialog>
  )
}

export default Modal;