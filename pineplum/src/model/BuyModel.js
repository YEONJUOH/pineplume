/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/buy.html",
    "model/MainModel",
    "jsrender"
], function ($,
             buy,
             main,
             jsrender
             ) {
    function BuyModel() {
        this.render = function (data) {
            var template = jsrender.templates(buy).render(data);
            $("#content").html(template);
            // 우편번호 찾기 찾기 화면을 넣을 element
            var element_wrap = document.getElementById('wrap');

            function foldDaumPostcode() {
                // iframe을 넣은 element를 안보이게 한다.
                element_wrap.style.display = 'none';
            }

            $("#postcode").click(function (e) {
                sample3_execDaumPostcode();
            })

            function sample3_execDaumPostcode() {
                // 현재 scroll 위치를 저장해놓는다.
                var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                new daum.Postcode({
                    oncomplete: function (data) {
                        // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                        var fullAddr = data.address; // 최종 주소 변수
                        var extraAddr = ''; // 조합형 주소 변수

                        // 기본 주소가 도로명 타입일때 조합한다.
                        if (data.addressType === 'R') {
                            //법정동명이 있을 경우 추가한다.
                            if (data.bname !== '') {
                                extraAddr += data.bname;
                            }
                            // 건물명이 있을 경우 추가한다.
                            if (data.buildingName !== '') {
                                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                            }
                            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                            fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                        }

                        // 우편번호와 주소 정보를 해당 필드에 넣는다.
                        document.getElementById('sample3_postcode').value = data.zonecode; //5자리 새우편번호 사용
                        document.getElementById('sample3_address').value = fullAddr;

                        // iframe을 넣은 element를 안보이게 한다.
                        // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                        element_wrap.style.display = 'none';

                        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                        document.body.scrollTop = currentScroll;
                    },
                    // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
                    onresize: function (size) {
                        element_wrap.style.height = size.height + 'px';
                    },
                    width: '100%',
                    height: '100%'
                }).embed(element_wrap);

                // iframe을 넣은 element를 보이게 한다.
                element_wrap.style.display = 'block';
            };

            $("#orderBtn").click(function (e) {

                var isValid = checkInput();
                if(!isValid) {
                    alert("필수 값을 입력해주세요");
                    return;
                }

                var isValideEmail = validateEmail($("#email").val());
                if(!isValideEmail) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return;
                }

                $("#orderBtn").css("color", "#f2f2f2");
                $("#orderBtn").css("border", "#f2f2f2");
                $("#orderBtn").click(function (e) {
                    return null;
                });

                var htmlBody = "";

                for(var i =0; i<data.orderList.length;i++){
                    htmlBody += '<span><i>' + data.orderList[i].name + '(' + data.orderList[i].option+')-'
                    +  data.orderList[i].qty + '개-' + data.orderList[i].moneyString + '</i></span><br/>';
                }
                htmlBody += '<span>총 금액:'  + data.total + '</span>';

                $.ajax({
                    method:'post',
                    url:'/sendmail',
                    data:{"email":$("#email").val(),"orderName":$("#orderName").val(), "htmlBody" : htmlBody},
                    success:function(data){
                        alert("메일이 발송되었습니다");
                        main.render();
                    },
                    error:function (request,status,error){
                        this.render();
                    }
                })





            });

            function checkInput() {
                var isValid = true;
                $(".necessary").each(function () {
                    if ($(this).val() == '') {
                        isValid = false;
                    }
                });
                return isValid;
            };

            function validateEmail(email) {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return re.test(email);
            };

        }.bind(this);



    }

    return new BuyModel();
});