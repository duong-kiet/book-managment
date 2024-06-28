// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]"); // trả về một mảng

if(listButtonStatus.length > 0) {
    let url = new URL(window.location.href); // lấy ra cửa sổ hiện tại 

    // Bắt sự kiện click
    listButtonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            
            if(status) {
                url.searchParams.set("status", status); // thêm tính năng query 
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });

    // Thêm class active mặc định
    const statusCurrent = url.searchParams.get("status") || "";
    const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);

    buttonCurrent.classList.add("active");
}
// End Button Status

// Form search
const formSearch = document.querySelector("[form-search");
if(formSearch) {
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        
    })
}

// End form search