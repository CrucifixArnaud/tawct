<?php 
	// Config	
	$dir = 'data/img/'; 
	$picturesCount = 0;
?>

<!doctype html>
<!--[if lt IE 7]>	<html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>		<html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>		<html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--><html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<title></title>
	<meta name="author" content="Crucifix Arnaud">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="ui/css/styles.css">	  
</head>
<body>
	<div id="global" class="no-js">
		<header>
			<h1><a id="link-about" href="#about">The Amazing Wc Tour</a></h1>
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
							<img src="data/img/<?php echo $picture; ?>" alt="">
							<figcaption><?php echo preg_replace("/\\.[^.\\s]{3,4}$/", "", $picture); ?></figcaption>
						</figure>
					</li>
					<?php
				}
			}  	
			
			closedir($d);
			
			?>
		</ul>
		<div id="about" class="off">
			<h2 class="about-line">About :</h2>
			<p class="about-line">The Amazing Wc Tour (<abbr title="The Amazing Wc Tour">tawct</abbr>) &mdash; Created by <a href="//crucifixarnaud.com" title="To Crucifix Arnaud personal page">Crucifix Arnaud</a> (2012)</p>
			<p class="about-line">The <?=  $picturesCount ?> photographs display on <abbr title="The Amazing Wc Tour">tawct</abbr> are shared under the terms of <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="Read the entire licence summry">Attribution, Noncommercial, Share Alike 3.0 Creative Commons Licence</a>.</p>
			<hr class="about-line" />
			<p class="about-line">All photographs is also display on <a href="http://www.flickr.com/photos/16957305@N07/sets/72157603760079304/" title="Visit the Tawct flickr set">Flickr</a> in different sizes.</p>
			<hr class="about-line" />
			<p class="about-line">This website use <strong>FengardoNeue</strong> typeface, created by <a href="//www.akalollip.com" title="To akalollip personal website">akalollip</a> and distributed by <a href="http://velvetyne.fr/" title="To the velvetyne website">velvetyne type foundry</a> under <a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"><abbr title="SIL Open Font License">SIL OFL</abbr> licence</a> or creative commons licences.</p>
			<p class="about-line">Captions use <strong>Courier</strong> typeface, created by <a href="http://www.graphos.org/courier.html" title="To the graphos.org page about Courier">Howard "Bud" Kettler</a> for <abbr title="International Business Machines">ibm</abbr>.</p>
		</div>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="ui/js/lib/jquery.mousewheel.js"></script>
	<script src="ui/js/lib/browsersdetect.js"></script>
	<script src="ui/js/tawct.js"></script>
</body>
</html>