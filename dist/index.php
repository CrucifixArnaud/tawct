<?php
	// Config
	$config = parse_ini_file ('config.ini');
	$app = $config['app'];
	$dir = $config['data'];
	$env = $config['environment'];
	$statics = $config['statics'];
	$favicon = $config['favicon'];
	$picturesCount = 0;
?>
<!doctype html>
<!--[if lt IE 7]> <html class="ie ie6 lte9 lte8 lte7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="ie ie7 lte9 lte8 lte7" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="ie ie8 lte9 lte8" lang="en"> <![endif]-->
<!--[if IE 9]> <html class="ie ie9 lte9" lang="en"> <![endif]-->
<!--[if gt IE 9]> <html class="ie" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">

	<!-- Prefetch DNS for external assets. -->
	<link rel="dns-prefetch" href="/ajax.googleapis.com/">

	<title>The Amazing Wc Tour</title>
	<meta name="author" content="humans.txt">
	<meta name="description" content="WC that I have visited in my life. Simple photography, no pictures improvement, just raw shoots of toilets, takes in every day's life condition">
	<meta name="apple-mobile-web-app-title" content="The Amazing Wc Tour">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="<?= $statics ?>/css/styles.css">
</head>
<body>
	<div id="global" class="no-js">
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

			foreach($files as $picture){
				$ext = strrchr($picture, '.');
				if(in_array($ext, $validExtension)){
					$picturesCount++;
					?>
					<li>
						<figure>
							<img data-original="data/img/<?php echo $picture; ?>" src="<?= $statics ?>/img/placeholder-1px.png" alt="">
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
			<p>The <?=  $picturesCount ?> photographs display on <abbr title="The Amazing Wc Tour">tawct</abbr> are shared under the terms of <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="Read the entire licence summry">Attribution, Noncommercial, Share Alike 3.0 Creative Commons Licence</a>.</p>
			<hr />
			<p>All photographs is also display on <a href="http://www.flickr.com/photos/16957305@N07/sets/72157603760079304/" title="Visit the Tawct flickr set">Flickr</a> in different sizes.</p>
			<hr />
			<p>This website use <strong>FengardoNeue</strong> typeface, created by <a href="//www.akalollip.com" title="To akalollip personal website">akalollip</a> and distributed by <a href="http://velvetyne.fr/" title="To the velvetyne website">velvetyne type foundry</a> under <a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"><abbr title="SIL Open Font License">SIL OFL</abbr> licence</a> or creative commons licences.</p>
			<p>Captions use <strong>Courier</strong> typeface, created by <a href="http://www.graphos.org/courier.html" title="To the graphos.org page about Courier">Howard "Bud" Kettler</a> for <abbr title="International Business Machines">ibm</abbr>.</p>
		</div>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="<?= $statics ?>/js/lib/jquery.lazyload.min.js"></script>
	<?php if($env == 'dev'){ ?>
		<script src="<?= $statics ?>/js/lib/browsersdetect.min.js"></script>
		<script src="<?= $statics ?>/js/lib/jquery.lazyload.min.js"></script>
		<script src="<?= $statics ?>/js/lib/jquery.mousewheel.min.js"></script>
		<script src="<?= $statics ?>/js/animate-sequence.js"></script>
		<script src="<?= $statics ?>/js/tawct.js"></script>
	<?php }else{ ?>
		<script src="<?= $statics ?>/js/scripts.js"></script>
	<?php }?>

	<?php if($env == 'production'){?>
		<!-- Google Analytics
		================================== -->
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-58253490-1', 'auto');
			ga('send', 'pageview');

		</script>
	<?php }?>

</body>
</html>
