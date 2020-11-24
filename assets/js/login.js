$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  let form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (pwd2) {
      let pwd1 = $('.reg-box [name=password]').val();
      if (pwd1 != pwd2) return '两次密码不一样哦'

    }
  })


  // let baseUrl = 'http://ajax.frontend.itheima.net';

  $('#regForm').on('submit', submitData);

  $('#foemLogin').on('submit', function (e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    $.aiax({
      url: '/api/login',
      method: 'post',
      data: dataStr,
      success(res) {
        if (res.status != 0) return layui.layer.msg(res.message);
        layui.layer.msg(res.message, {
          icon: 6,
          time: 1500
        }, function () {
          localStorage.setItem('token', res.token);
          location.href = '/index.html'
        })
      }
    })
  });

  function submitData(e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    $.ajax({
      url: '/api/reguser',
      method: 'post',
      data: dataStr,
      success(res) {
        layui.layer.msg(res.message);
        if (res.status != 0) return;
        let uname = $(".reg-box[name=username]").val().trim();
        $('.login-box[name=username]').val(uname);
        let unpwd = $(".reg-box[name=password]").val().trim();
        $('.login-box[name=password]]').val(unpwd);
        $('#regForm')[0].reset();
        $('#link_login').click();
      }

    });
  }

}) 