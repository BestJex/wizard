/**
 * Created by mylxsw on 2017/8/3.
 */
$.wz = {
    /**
     * 发起异步请求
     *
     * @param method
     * @param url
     * @param params
     * @param successCallback
     * @param errorCallback 返回true则跳过默认逻辑，返回false则继续执行默认逻辑
     */
    request: function (method, url, params, successCallback, errorCallback) {
        successCallback = successCallback || function (data) {};
        errorCallback = errorCallback || function (response) { return false; };

        $.ajax({
            url: url,
            type: method,
            data: params,
            dataType: 'json',
            success: successCallback,
            error: function (response) {
                if (errorCallback(response)) {
                    return;
                }

                if (response.status === 422) {
                    var messages = [];
                    for (var k in response.responseJSON) {
                        for (var i in response.responseJSON[k]) {
                            messages.push(response.responseJSON[k][i]);
                        }
                    }
                    layer.alert(messages.join('; '));
                } else {
                    layer.alert('server error');
                }
            }
        });
    },
    /**
     * 异步表单提交
     *
     * @param form
     * @param params
     * @param successCallback
     * @param errorCallback 返回true则跳过默认逻辑，返回false则继续执行默认逻辑
     */
    asyncForm: function (form, params, successCallback, errorCallback) {
        successCallback = successCallback || function (data) {};
        errorCallback = errorCallback || function (response) { return false; };
        params = params || {};

        var datas = [];
        for (var key in params) {
            datas.push(key + "=" + params[key]);
        }
        datas.push(form.serialize());

        $.wz.request(
            'post',
            form.attr('action'),
            datas.join('&'),
            successCallback,
            errorCallback
        );
    },
    /**
     * 弹框提示
     *
     * @param message
     * @param callback
     */
    alert: function (message, callback) {
        callback = callback || function() {};
        layer.alert(message, {closeBtn: 0, scrollbar: false}, function () {
            callback();
            layer.close(index);
        })
    },
    /**
     * 选择确认提示
     *
     * @param message
     * @param callback
     */
    confirm: function (message, callback) {
        layer.confirm(message, {}, callback);
    }
};