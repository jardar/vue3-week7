import Swal from "sweetalert2";

// toast 顯示方式，一般搭配 toast, position, timer
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  //   timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function showToast(msg = "ok", icon = "success") {
  Toast.fire({
    icon: icon,
    title: msg,
  });
}
function showDlg(title = "注意", msg = "ok", icon = "success") {
  Swal.fire({
    title: title,
    text: msg,
    icon: icon,
    confirmButtonText: "確定",
  });
}

export { showToast, showDlg };
