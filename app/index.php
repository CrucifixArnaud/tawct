<?php
  // Config
  $config = parse_ini_file ('config.ini');
  $dir = $config['data'];
  $env = $config['environment'];
  $picturesCount = 0;
?>
<!doctype html>
<!--[if lte IE 8]> <html class="no-js lt-e8" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <title>The Amazing Wc Tour</title>
  <meta name="author" content="humans.txt">
  <meta name="description" content="WC that I have visited in my life. Simple photography, no pictures improvement, just raw shoots of toilets, takes in every day's life condition">
  <meta name="apple-mobile-web-app-title" content="The Amazing Wc Tour">

  <meta name="viewport" content="width=device-width">

  <!-- Styles -->
  <link rel="stylesheet" href="/statics/css/styles.css">

  <!-- Favicon & others -->
  <link rel="apple-touch-icon" sizes="180x180" href="/statics/img/favicons/apple-touch-icon.png">
  <link rel="icon" href="/statics/img/favicons/favicon-32x32.png?v=2" sizes="32x32">
  <link rel="icon" href="/statics/img/favicons/favicon-16x16.png?v=2" sizes="16x16">
  <link rel="manifest" href="/statics/img/favicons/manifest.json">
  <meta name="theme-color" content="#ffffff">

  <script type="text/javascript">
    /*! modernizr 3.3.1 (Custom Build) | MIT *
    * https://modernizr.com/download/?-setclasses !*/
    !function(n,e,s){function o(n,e){return typeof n===e}function a(){var n,e,s,a,i,l,r;for(var c in f)if(f.hasOwnProperty(c)){if(n=[],e=f[c],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(s=0;s<e.options.aliases.length;s++)n.push(e.options.aliases[s].toLowerCase());for(a=o(e.fn,"function")?e.fn():e.fn,i=0;i<n.length;i++)l=n[i],r=l.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),t.push((a?"":"no-")+r.join("-"))}}function i(n){var e=r.className,s=Modernizr._config.classPrefix||"";if(c&&(e=e.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");e=e.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(e+=" "+s+n.join(" "+s),c?r.className.baseVal=e:r.className=e)}var t=[],f=[],l={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var s=this;setTimeout(function(){e(s[n])},0)},addTest:function(n,e,s){f.push({name:n,fn:e,options:s})},addAsyncTest:function(n){f.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var r=e.documentElement,c="svg"===r.nodeName.toLowerCase();a(),i(t),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();n.Modernizr=Modernizr}(window,document);
  </script>

</head>
<body>
  <div id="global">
    <header>
      <h1><a class="link-about" href="#about">The Amazing Wc Tour</a></h1>
      <a class="link-about" href="#about">About</a>
    </header>
    <ul id="gallery" class="cf"><?php
      $d = opendir($dir);
      clearstatcache();
      $files = array();
      $i = 0;

      while($file = readdir($d)){
        $i ++;
        $files[$i] = $file;
      }

      shuffle($files);

      $validExtension = array('.png','.jpg','.gif','.JPG');

      foreach($files as $key=>$picture){
        $ext = strrchr($picture, '.');
        if(in_array($ext, $validExtension)){
          $picturesCount++;
          ?>
          <li>
            <figure>
              <?php
                if($key <= 5){ ?>
                  <img src="data/img/<?php echo $picture; ?>" alt=""> <?php
                }else{ ?>
                  <img data-original="data/img/<?php echo $picture; ?>" alt="">
                  <noscript><img src="data/img/<?php echo $picture; ?>" alt=""></noscript> <?php
                }
              ?>
              <figcaption><?php echo preg_replace("/\\.[^.\\s]{3,4}$/", "", $picture); ?></figcaption>
            </figure>
          </li>
          <?php
        }
      }

      closedir($d);

      ?>
    </ul>
    <div id="about">
      <h2>About :</h2>
      <p>The Amazing Wc Tour (<abbr title="The Amazing Wc Tour">tawct</abbr>) &mdash; Created by <a href="//crucifixarnaud.com" title="To Crucifix Arnaud personal page">Crucifix Arnaud</a> (2012)</p>
      <hr />
      <p>The Amazing Wc Tour and the <?=  $picturesCount ?> photographs are shared under <a href="http://sam.zoy.org/wtfpl/"><abbr title="Do What the Fuck You Want to Public License">WTFPL</abbr> license</a>.</p>
      <hr />
      <p>This website use <strong>FengardoNeue</strong> typeface, created by <a href="//www.akalollip.com" title="To akalollip personal website">akalollip</a> and distributed by <a href="http://velvetyne.fr/" title="To the velvetyne website">velvetyne type foundry</a> under <a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"><abbr title="SIL Open Font License">SIL OFL</abbr> licence</a> or creative commons licences.</p>
      <p>Captions use <strong>Courier</strong> typeface, created by <a href="http://www.graphos.org/courier.html" title="To the graphos.org page about Courier">Howard "Bud" Kettler</a> for <abbr title="International Business Machines">ibm</abbr>.</p>
    </div>
  </div>
  <?php if($env == 'dev'){ ?>
    <script src="/statics/js/lib/lazyload.min.js"></script>
    <script src="/statics/js/utils.js"></script>
    <script src="/statics/js/animate-sequence.js"></script>
    <script src="/statics/js/tawct.js"></script>
  <?php }else{ ?>
    <script src="/statics/js/scripts.js"></script>
  <?php }?>

</body>
</html>
