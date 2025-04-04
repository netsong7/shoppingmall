/* 로그인 기능 */

const loginForm = document.querySelector("#loginForm")

loginForm.addEventListener("submit" , async(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);

    // URL 인코딩된 폼 데이터로 변환
    const urlEncodedData = new URLSearchParams(formData).toString();

    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
    const response = await fetch("/login/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            [csrfHeader] : csrfToken
        },
        body: urlEncodedData // JSON 대신 URL 인코딩된 폼 데이터 사용
    });
    if(response.redirected) {
        window.location.href = response.url;
    }
    else if(!response.ok) {
        const result = await response.json();
        const error = document.querySelector(".error")
        error.innerHTML = "";
        error.style.display = "block"
        error.textContent = result.message
    } else {
        // 성공했지만 리다이렉트 정보가 없는 경우
        window.location.href = "/";
    }

})