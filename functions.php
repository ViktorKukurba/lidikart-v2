<?php
function addScripts() {
	$scripts = array(
		'runtime',
		'polyfills',
		'styles',
		'vendor',
		'main',
	);
	foreach ($scripts as $script ) {
		wp_enqueue_script($script, get_template_directory_uri() . '/dist/lidikart-v2' . $script . '.js', null, 'v2.0', true);
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
add_theme_support('post-thumbnails');
add_theme_support('post-formats', array('video'));

require get_parent_theme_file_path( '/inc/blog.php' );

/**
 * Customizer additions.
 */
//require get_parent_theme_file_path( '/inc/customizer.php' );
?>
