<?php

function my_scripts() {
	$styles = array(
		'/css/bootstrap.css',
		'/node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
		'/bower_components/slick-carousel/slick/slick-theme.css',
		'/bower_components/slick-carousel/slick/slick.css',
		'/fonts/css/font-awesome.min.css',
		'/build/lidik-art.css',
	);
	add_filter('script_loader_tag', 'add_attribute_to_script', 10, 2);
	function add_attribute_to_script($tag, $handle) {
		$format = ' data-main="%s/build/main.js" src';
    	$dataAttr = sprintf($format, get_template_directory_uri());
		return str_replace( ' src', $dataAttr, $tag );
	}
	wp_enqueue_script('script', get_template_directory_uri() . '/bower_components/requirejs/require.js');
	foreach ($styles as $index=>$style ) {
		wp_enqueue_style('style' . $index, get_template_directory_uri() . $style);
	}
}

function addScripts() {
	$scripts = array(
		'runtime',
		'polyfills',
		'styles',
		'vendor',
		'main',
	);
	foreach ($scripts as $script ) {
		wp_enqueue_script($script, get_template_directory_uri() . '/dist/' . $script . '.js', null, 'v2.0', true);
	}
}

// addScripts();

add_action( 'rest_api_init', function () {
	register_rest_route( 'myplugin/v1', '/author/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'my_awesome_func',
	) );
} );

$img_sizes = array('te' => 2);


function my_awesome_func( WP_REST_Request $request ) {
    global $img_sizes;
	// You can access parameters via direct array access on the object:
	$param = $request['some_param'];

	// Or via the helper method:
	$param = $request->get_param( 'some_param' );

	// You can get the combined, merged set of parameters:
	$parameters = $request->get_params();

	// The individual sets of parameters are also available, if needed:
	$parameters = $request->get_url_params();
	$parameters = $request->get_query_params();
	$parameters = $request->get_body_params();
	$parameters = $request->get_json_params();
	$parameters = $request->get_default_params();

	// Uploads aren't merged in, but can be accessed separately:
	$parameters = $request->get_file_params();
    $options = get_option('simple_image_sizes', array('test' => 121) );
	return $options;
}
function display_image_sizes($sizes) {
    global $img_sizes;
    $img_sizes = $sizes;
}

add_filter('image_size_names_choose', 'display_image_sizes');
remove_filter('template_redirect', 'redirect_canonical');
// add_action( 'wp_enqueue_scripts', 'my_scripts' );
add_theme_support('post-thumbnails');
add_theme_support('post-formats', array('video'));

require get_parent_theme_file_path( '/inc/blog.php' );

/**
 * Customizer additions.
 */
//require get_parent_theme_file_path( '/inc/customizer.php' );
?>