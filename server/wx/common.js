/**
 * Created by administrator on 15-10-3.
 */
Picker.route('/getsignature',function(params, req, res, next){
    console.log("---------------getsignature-----------------");
   // var url = 'http://am.xianro.com/getsignature';
    var url = 'http://192.168.1.104:3000/getsignature';
    console.log(url);
    wugg.getSignature(config,url,function(err,data){
        console.log("err:",err);
        console.log("data:",+data)
    });
    /*createSignature(url, function(error, result) {
        if (error) {
            res.json({
                'error': error
            });
        } else {
            res.json(result);
        }
    });*/
});