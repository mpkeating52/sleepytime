var sleepy_time = {
        'init': function () {
            SC.initialize({
                'client_id': keys.soundcloud.client_id
            });
        },
        'search': function (options, callback) {
            SC.get('/tracks', options, callback);
        },
        'play': function (track_uri, callback) {
            if (callback) {
                SC.stream(track_uri, callback);
            } else {
                SC.stream(track_uri, function (sound) {
                    sound.play();
                });
            }
        },
        'btn_search': function(){
            var search_string = $('#search-box').val();
            sleepy_time.search({'genres': search_string}, function(result){
                if(result) {
                    $('#search-results').empty();
                    for (var i = 0; result.length > i && i < 11; i++) {
                        var str = '<li>' + JSON.stringify(result[i].title) + '</li>';
                        $('#search-results').append(str);
                    }
                }
            })
        }
    };
    
$(function(){
    sleepy_time.init();
    $('.search-btn').click(sleepy_time.btn_search);
});