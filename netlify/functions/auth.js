exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // 用户数据库示例占位符
    const users = {
      "uki202797": { 
        password: "zxcvbnm", 
        role: "admin", 
        token: "tk_admin_999" 
      },
      "cjsmartcargo": { 
        password: "smart2026", 
        role: "staff", 
        token: "tk_staff_888" 
      },
      "cjpublic": { 
        password: "zxcvbnm", 
        role: "viewer", 
        token: "tk_viewer_777" 
      }
    };

    const user = users[username];

    // 验证账号和密码
    if (user && user.password === password) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          token: user.token,
          role: user.role // 返回角色用于前端权限控制
        }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, msg: "账号或密码错误" }),
      };
    }
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ msg: "无效的请求" }) };
  }
};