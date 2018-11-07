<?php
/**
 * LidikArt: Customizer
 *
 * @package WordPress
 * @subpackage LidikArt
 * @since 1.0
 */

 add_action('save_post', 'save_post_handler', 10, 3 );

 function save_post_handler($post_id, $post, $update) {
 //    $json_value = json_decode('{"en": "Place for people", "ua": "Простір для людей"}', true);
     $json_value = json_decode($post->post_content, true);
     $property = 'post-id-' .$post->ID;
     save_locale_languages($property, $json_value, 'en');
     save_locale_languages($property, $json_value, 'ua');
 }

 function save_locale_languages($property, $json_value, $locale) {
     $file = get_template_directory() . '/wp-languages/' . $locale . '.json';
     $current = file_get_contents($file);
     $json_data = json_decode($current, true);
//     $json_data[$property] = mb_convert_encoding($json_value[$locale], 'UTF-8', 'auto');
//     file_put_contents($file, json_encode($json_data));
     file_put_contents($file, json_encode($json_value));
 }

add_filter( 'customize_save_after', 'filter_function_name_11', 10, 2 );
//add_filter( 'customize_save_response', 'filter_function_name_11', 10, 2 );
//add_filter( 'customize_save_response', 'filter_function_name_11', 10, 2 );
function filter_function_name_11( $response, $data ){
	// filter...customize_save_after
//	echo json_encode($response);
	save_locale_languages('save_settings', $response->about_html->value, "en");
	save_locale_languages('save_settings', $data->about_html['value'], "ua");
	return $response;
}

// function action_customize_save($instance) {
////    echo 'SAVED';
////    save_locale_languages('save_settings', json_decode('{"t":"t"}', true), "en");
//    return True;
// }

// add_action( 'customize_save_(id_data[base])', 'action_function_name_11' );
 //function action_function_name_11( $this ){
 	// action...
 //}

 // add the action
// add_action( 'customize_save', 'action_customize_save', 10, 1 );
remove_action( 'customize_save_(id_data[base])', 'action_function_name_11' );

remove_action( 'customize_save', 'action_customize_save', 10, 1 );

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function lidik_customize_register( $wp_customize ) {

    $wp_customize->add_setting('share_info', array(
      'type' => 'theme_mod', // or 'option'
      'capability' => 'edit_theme_options',
      'theme_supports' => '', // Rarely needed.
      'default' => '',
      'transport' => 'postMessage', // or postMessage
      'sanitize_callback' => '',
      'sanitize_js_callback' => '', // Basically to_json.
    ));

    $wp_customize->add_setting('share_image', array(
          'type' => 'theme_mod', // or 'option'
          'capability' => 'edit_theme_options',
          'theme_supports' => '', // Rarely needed.
          'default' => '',
          'transport' => 'postMessage', // or postMessage
          'sanitize_callback' => '',
          'sanitize_js_callback' => '', // Basically to_json.
        ));

    $wp_customize->add_section( 'fb_share_page', array(
      'title' => __( 'Facebook share info' ),
      'description' => __( 'Add facebook share information.' ),
      'panel' => '', // Not typically needed.
      'priority' => 160,
      'capability' => 'edit_theme_options',
      'theme_supports' => '', // Rarely needed.
    ) );

    $wp_customize->add_control(
           new WP_Customize_Image_Control(
               $wp_customize,
               'fn_image',
               array(
                   'label'      => __( 'Upload a logo', 'theme_name' ),
                   'section'    => 'fb_share_page',
                   'settings'   => 'share_image'
               )
           )
       );

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'fb_share',
            array(
                'label'          => __( 'Description', 'theme_name' ),
                'section'        => 'fb_share_page',
                'settings'       => 'share_info',
                'type'           => 'textarea',
                'choices'        => array(
                    'dark'   => __( 'Dark' ),
                    'light'  => __( 'Light' )
                ),
                 'input_attrs' => array(
                    'class' => 'my-custom-class-for-js',
                    'style' => 'height: 400px',
                    'placeholder' => __( 'JSON format' ),
                  )
            )
        )
    );
}

add_action( 'customize_register', 'lidik_customize_register' );
