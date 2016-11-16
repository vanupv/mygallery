/*  JavaScript Document - lynda.com  */

var thubmnailSpacing=15;

$(document).ready(function(){
    $('a.sortLink').on('click',function(e){
        e.preventDefault();
        $('a.sortLink').removeClass('selected');
        $(this).addClass('selected');
        var keyword = $(this).attr('data-keyword');
        sortThumbnails(keyword);
    });
    
    $('.gallery .sorting').css('margin-bottom',window.thubmnailSpacing+'px');
    $('.thumbnail_container a.thumbnail').addClass('showMe').addClass('fancybox').attr('rel','group');
    
    positionThumbnail();
    setInterval('chechViewport()',750);
});
function chechViewport()
{
    var photosWidth = $('.photos').width();
    var thumbnailContainerWidth = $('.thumbnailConatiner').width();
    var thumbnailWidth = $('.thumbnailContainer a.thumbnai:first-child').outerWidth();
    
    if(photosWidth < thumbnailContainerWidth){
        positionThumbnail();
    }
    if((photosWidth - thumbnailWidth) > thumbnailContainerWidth){
        positionThumbnail();
    }
    
    /* debug */ //$('.debug-size').html('photosWidth='+photosWidth+'thumbnailContainerWidth='+thumbnailContainerWidth);
}

function sortThumbnails(keyword){
    $('.thumbnai_container a.thumbnail').each(function(){
       
        var thumbnailKeyword = $(this).attr('data-keyword');
        
        if(keyword == 'all'){
            $(this).addClass('showMe').removeClass('hideMe');
        }else{
            if(thumbnailKeyword.indexOf(keyword) != -1){
                $(this).addClass('showMe').removeClass('hideMe').attr('rel','group');
                
            }else{
                $(this).addClass('hideMe').removeClass('showMe').attr('rel','group');
            }
        }
    });
    positionThumbnail();

}

function positionThumbnail()
{
    /* debug  */ //$('.debug-remainder').html('');
    
   
    $('thumbnail_container a.thumbnail.hideMe').animate({opacity:0},500,function(){
     //$(this).css({'display:none','top:0px','left:0px'});
    });
    
    var containerWidth= $('.photos').width();
    var thumbnail_R =0;
    var thumbnail_C =0;
    var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thubmnailSpacing;
    var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thubmnailSpacing;
    var max_C = Math.floor(containerWidth / thumbnailWidth);
    
    $('.thumbnail_container a.thumbnail.showMe').each(function(index){
       var remainder = (index%max_C)/100;
        var maxIndex = 0;
        /*  debug */ // $('.debug-remainder').append(remainder+' - ' ); 
        
          if(remainder == 0){
            if(index !=0 ){
                thumbnail_R +=thumbnailHeight;
            }
            thumbnail_C = 0;
            
        }else{
            thumbnail_C += thumbnailWidth;
        }
        
        $(this).css('display','block').animate({
           'opacity':1,
            'top':thumbnail_R+'px',
             'left':thumbnail_C+'px'
        }, 500);
        
        
        var newWidth = max_C * thumbnailWidth;
      var newHeight = thumbnail_R + thumbnailHeight;
        $('.thumbnail_container').css({'width':newWidth+'px', 'height':newHeight+'px'});
        
    });
    
    deleteFancyboxLinks();
    
    var sortingWidth = $('.thumbnailContainer').width() / thumbnailWidth;
    var newWidth = sortingWidth * thumbnailWidth - window.thubmnailSpacing;
    $('.sotring').css('width',newWidth+'px');
}

function deleteFancyboxLinks(){
    
    $('a.fancybox').unbind('click.fb');
    
    if($(window).width()<550){
        $('thumbnail_container a.thumbnail').removeClass('fancybox').attr('target','_blank');
        
    }else{
        $('.thumbnail_container a.thumbnail').removeAttr('target');
    }
    
    $('a.fancybox[rel="group"]').fancybox({
        'transitionIn' : 'elastic',
        'transitionOut' : 'elastic',
        'titlePosition' : 'over',
        'speedIn' : 500,
        'overlayColor' : '#000',
        'padding' : 0,
        'overlayOpacity' : .75
        
        
    });
}



