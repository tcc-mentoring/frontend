export function openDialog (dialog: string) {
    const dialogObject = document.getElementById(dialog);
    if (dialogObject) {
        dialogObject.setAttribute("open", "true");
    }
}

export function closeDialog (dialog: string) {
    const dialogObject = document.getElementById(dialog);
    if (dialogObject) {
        dialogObject.setAttribute("open", "false");
    }   
}

export function closeMenuDialog() {
    document.getElementById("main-menu")?.removeAttribute("open");
}