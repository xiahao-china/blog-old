
$(document).ready(function () {

    $('#01').click(function () {
        let newTip = new FormData();
        newTip.append('name', document.getElementById('i1').value)
        newTip.append('action', document.getElementById('i2').value)
        newTip.append('details', document.getElementById('i3').value)
        newTip.append('saw', document.getElementById('i4').value)
        newTip.append('time', document.getElementById('i5').value)
        newTip.append('img',$('#i6')[0].files[0])


        $.ajax({
            type: 'post',
            url: Path+'/manage/upDateHotTip',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: newTip,
            success: function (result) {

            },
            error: function () {
                alert('操作失败');
            }
        })
    })

    $('#02').click(function () {
        let newTip = new FormData();
        newTip.append('name', document.getElementById('i7').value)
        $.ajax({
            type: 'post',
            url: Path+'/index/incSaw',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: newTip,
            success: function (result) {

            },
            error: function () {
                alert('操作失败');
            }
        })
    })

    $('#03').click(function () {
        let newTip = new FormData();
        newTip.append('name', document.getElementById('i8').value)
        newTip.append('password', document.getElementById('i9').value)
        newTip.append('sex', document.getElementById('i10').value)
        newTip.append('mail', document.getElementById('i11').value)
        newTip.append('phone', document.getElementById('i12').value)
        newTip.append('introduce', document.getElementById('i13').value)
        newTip.append('headImg',$('#i14')[0].files[0])


        $.ajax({
            type: 'post',
            url: Path+'/signUp',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: newTip,
            success: function (result) {

            },
            error: function () {
                alert('操作失败');
            }
        })
    })

    $('#04').click(function () {
        let newTip = new FormData();
        newTip.append('name', document.getElementById('i15').value)
        newTip.append('password', document.getElementById('i16').value)

        $.ajax({
            type: 'post',
            url: Path+'/signIn',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: newTip,
            success: function (result) {

            },
            error: function () {
                alert('操作失败');
            }
        })
    })

    $('#05').click(function () {
        $.ajax({
            type: 'post',
            url: Path+'/myself/getMyselfInformation',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: {},
            success: function (result) {
                console.log(result);
            },
            error: function () {
                alert('操作失败');
            }
        })
    })


    $('#06').click(function () {
        let newTip = new FormData();
        newTip.append('sex', document.getElementById('i17').value)
        newTip.append('mail', document.getElementById('i18').value)
        newTip.append('phone', document.getElementById('i19').value)
        newTip.append('introduce', document.getElementById('i20').value)
        $.ajax({
            type: 'put',
            url: Path+'/myself/upMyselfInformation',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data:newTip,
            success: function (result) {
                console.log(result);
            },
            error: function () {
                alert('操作失败');
            }
        })
    })

    $('#07').click(function () {
        let newTip = new FormData();
        newTip.append('headImg', $('#i21')[0].files[0])
        $.ajax({
            type: 'put',
            url: Path+'/myself/upHeadImg',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data:newTip,
            success: function (result) {
                console.log(result);
            },
            error: function () {
                alert('操作失败');
            }
        })
    })

    $('#08').click(function () {
        let newTip = new FormData();
        newTip.append('key', $('#i22')[0].value)
        $.ajax({
            type: 'post',
            url: Path+'/tipDeatil/findTip',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data:newTip,
            success: function (result) {
                console.log(result);
            },
            error: function () {
                alert('操作失败');
            }
        })
    })
})