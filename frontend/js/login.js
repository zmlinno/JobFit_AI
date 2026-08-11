// 找到页面中的登录按钮
const loginButton = document.getElementById("loginButton");


// 给登录按钮添加点击事件
loginButton.addEventListener("click", async function () {

    // 获取用户输入的邮箱和密码
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 用于显示登录结果
    const message = document.getElementById("message");


    // 判断用户是否填写了邮箱和密码
    if (!email || !password) {
        message.textContent = "请输入邮箱和密码";
        return;
    }


    try {
        // 使用 fetch 向 FastAPI 后端发送 POST 请求
        const response = await fetch(
            "http://127.0.0.1:8000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        // 将后端返回的 JSON 转换成 JavaScript 对象
        const result = await response.json();


        // 判断 HTTP 请求是否成功
        if (response.ok) {
            message.textContent = result.message;
            console.log("登录用户：", result.user);
        } else {
            message.textContent = result.detail;
        }

    } catch (error) {
        message.textContent = "无法连接后端服务器";
        console.error("请求失败：", error);
    }
});