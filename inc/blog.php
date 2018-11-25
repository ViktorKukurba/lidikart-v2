<?php
add_action( 'init', 'true_register_products' ); // Использовать функцию только внутри хука init
 
function true_register_products() {
	$labels = array(
		'name' => 'Blogs',
		'singular_name' => 'Blog', // админ панель Добавить->Функцию
		'add_new' => 'Add blog post',
		'add_new_item' => 'Title', // заголовок тега <title>
		'edit_item' => 'Edit blog',
		'new_item' => 'New blog',
		'all_items' => 'All blogs',
		// 'view_item' => 'Просмотр товаров на сайте',
		'search_items' => 'Search blog',
		'not_found' =>  'Blog not found.',
		// 'not_found_in_trash' => 'В корзине нет товаров.',
		'menu_name' => 'Blogs' // ссылка в меню в админке
	);
	$args = array(
		'labels' => $labels,
		'public' => true, // благодаря этому некоторые параметры можно пропустить
		'menu_icon' => 'dashicons-align-right', // иконка корзины
		'menu_position' => 5,
		'has_archive' => true,
		'show_in_rest' => true,
		'rest_base' => 'blogs',
		'supports' => array( 'title', 'editor'),
		'taxonomies' => array('post_tag')
	);
	register_post_type('blog',$args);
}
