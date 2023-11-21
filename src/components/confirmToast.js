import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showCloseButton: true,
  showConfirmButton: false,
  color: "#FFFFFF",
});
export default Toast;
