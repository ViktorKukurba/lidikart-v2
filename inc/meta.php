<?php
    function hook_meta() {
        preg_match('/(pic=(\d+))/', $_SERVER[REQUEST_URI], $pic_array);
        $meta = getPostMeta();
        if (!$meta) {
            $meta = getBlogMeta();
        }

        $url = 'https://' . $_SERVER[HTTP_HOST] . $_SERVER[REQUEST_URI];

        if ($meta) {
            $img = $meta["img"] ? $meta["img"] : get_option('fb_site_image');
            $desc = $meta["desc"] ? $meta["desc"] : get_option('fb_site_description');
            $title = $meta["title"] ? $meta["title"] : get_option('fb_site_title');
            ?>
            <meta property="og:image" content="<?php echo $img ?>"/>
            <meta property="og:title" content="<?php echo $title ?>"/>
            <meta property="og:description" content="<?php echo $desc ?>"/>
            <?php
        } else {
            ?>
            <meta property="og:description" content="<?php echo get_option('fb_site_description') ?>"/>
            <meta property="og:image" content="<?php echo get_option('fb_site_image') ?>"/>
            <?php
        }
        ?>
        <meta property="fb:app_id" content="<?php echo get_option('fb_site_app_id') ?>"/>
        <meta property="og:site_name" content="<?php echo get_option('fb_site_name') ?>"/>
        <meta property="og:url" content="<?php echo $url ?>"/>
        <?php
    }

    function getBlogMeta($re = '/blog\/(\d+)/') {
      preg_match($re, $_SERVER[REQUEST_URI], $blog_array);
      if (count($blog_array) == 2) {
          $post_id = $blog_array[1];
          $post = get_post($post_id, OBJECT);
          $content = $post->post_content;
          preg_match('/ src="([^\"]+)/', $content, $image);
          $lang = (strpos($_SERVER[REQUEST_URI], "/en/") === 0) ? 'en' : 'uk';
          $trans = qtrans_use($lang, $content, false);
          $doc = new DOMDocument();
          $doc->loadHTML('<?xml encoding="utf-8" ?>' . $trans);
          $doc->saveHTML();
          $desc = $doc->textContent;
          $title = qtrans_use($lang, $post->post_title,false);
          return array(
              img => $image[1],
              desc => substr($desc, 0, 400) . '...',
              title => $title
          );
      } else {
          return getBlogMetaDep();
      }
  }

    function getBlogMetaDep($re = '/blog;(post=(\d+))/') {
        preg_match($re, $_SERVER[REQUEST_URI], $blog_array);
        if (count($blog_array) == 3) {
            $post_id = $blog_array[2];
            $post = get_post($post_id, OBJECT);
            $content = $post->post_content;
            preg_match('/ src="([^\"]+)/', $content, $image);
            $lang = (strpos($_SERVER[REQUEST_URI], "/en/") === 0) ? 'en' : 'uk';
            $trans = qtrans_use($lang, $content, false);
            $doc = new DOMDocument();
            $doc->loadHTML('<?xml encoding="utf-8" ?>' . $trans);
            $doc->saveHTML();
            $desc = $doc->textContent;
            $title = qtrans_use($lang, $post->post_title,false);
            return array(
                img => $image[1],
                desc => substr($desc, 0, 400) . '...',
                title => $title
            );
        } else {
            return false;
        }
    }

    function getPostMeta() {
        preg_match('/(pic=(\d+))/', $_SERVER[REQUEST_URI], $pic_array);
        if (count($pic_array) == 3) {
            $post_id = $pic_array[2];
            $post = get_post($post_id, OBJECT);
            $thumbnail_id = get_post_thumbnail_id($post_id);
            $meta_image = wp_get_attachment_image_src($thumbnail_id, 'img-1200');
            $term_image = get_wp_term_image($post_id);
            $lang = (strpos($_SERVER[REQUEST_URI], "/en/") === 0) ? 'en' : 'uk';
            $title = qtrans_use($lang, $post->post_title,false);
            $content = $post->post_content;
            preg_match('/img.*src="([^\"]+)/', $content, $image);
            $lang = (strpos($_SERVER[REQUEST_URI], "/en/") === 0) ? 'en' : 'uk';
            $desc = qtrans_use($lang, $content, false);

            return array(
                img => $meta_image[0],
                desc => $desc,
                title => $title
            );
        } else {
            return false;
        }

    }

    add_action('wp_head', 'hook_meta');
