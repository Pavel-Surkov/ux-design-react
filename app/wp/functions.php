<?php
/**
 * UX Mind School functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package UX_Mind_School
 */

//ALFA-BANK API
define('ALFA_USERNAME', 'Ux-school-api');
define('ALFA_PASSWORD', '-kHgb#Tw8tR9j=tX');
define('ALFA_GATEWAY_URL', 'https://ecom.alfabank.by/payment/rest/');

//SENDPULSE API
define('SENDPULSE_ID', '14544b633e6ec8e89543938469a43484');
define('SENDPULSE_SECRET', '157af1c3c51e29f5833b6ec53b693371');
define('SENDPULSE_URL', 'https://api.sendpulse.com/');

//BEPAID API
define('BEPAID_CHECKOUT_URL', 'https://checkout.bepaid.by/ctp/api/checkouts');
define('BEPAID_SECRET_KEY', 'b88038e0fb43f4c5d68587b05b4d8937376284760c091c2357ae429342011ce4');
define('BEPAID_ID', '11820');

//CURRENCIES
define('CURRENCY_URL', 'https://www.nbrb.by/api/exrates/rates/');
define('USD_RATE', 2.51);
define('RUB_RATE', 3.41);

//COMMON DATA
define('CURRENCY_CODE', 'BYN');
define('RETURN_URL', 'https://ux-school.by/uspeshnaya-oplata/');
define('CURRENCY_RATES', array(get_currency_rate('USD'), get_currency_rate('RUB')));
define('COURSE_TYPES', array(
	'Занятия в классе' => 'offline',
	'Онлайн' => 'online',
	'Дистанционное обучение через Zoom' => 'remote'
));
	
//AMO CRM API
define('AMOCRM_USER', 'https://uxschoolby.amocrm.ru/');
define('AMOCRM_CLIENT_ID', '8b5659da-cfc4-46d9-be3b-f7f759f56134');
define('AMOCRM_CLIENT_SECRET', 'r1n4H8fiK1U9YgPS0qOZ4p2IRYUa4RyXLJkM9EBgx0QUM8hgwJbtnEJfIYAtANhc');
define('AMOCRM_REDIRECT_URI', 'https://ux-school.by/');

//IP INFO
define('IP_INFO_TOKEN', 'ce4ee1923ec809');

if ( ! function_exists( 'ux_mind_school_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function ux_mind_school_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on UX Mind School, use a find and replace
		 * to change 'ux-mind-school' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'ux-mind-school', get_template_directory() . '/languages' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'First' => esc_html__( 'Primary', 'ux-mind-school' ),
			'Second' => esc_html__( 'Footer first', 'ux-mind-school' ),
			'Third' => esc_html__( 'Secondary', 'ux-mind-school' ),
			'Fourth' => esc_html__( 'Footer second', 'ux-mind-school' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );
	}
endif;
add_action( 'after_setup_theme', 'ux_mind_school_setup' );

//Регистрируем основыне скрипты и стили сайта
add_action('wp_enqueue_scripts', 'add_scripts_and_styles');   

function add_scripts_and_styles() {
	// Регистрируем стили
	wp_register_style('application', get_template_directory_uri() . '/css/application.css', array(), null, false);
	// Подключаем скрипты
	wp_enqueue_style('application');
	// Регистрируем скрипты
	if ( !is_page_template('home.php') ):
		wp_register_script('application', get_template_directory_uri() . '/js/application.js', array('jquery'), null, true);
		// Подключаем скрипты
		wp_enqueue_script('application');
	else:
		wp_register_script('application-home', get_template_directory_uri() . '/js/application-home.js', array('jquery'), null, true);
		// Подключаем скрипты
		wp_enqueue_script('application-home');
	endif;
	if ( is_page_template('payment.php') ):
		wp_register_script('payment', get_template_directory_uri() . '/js/bundle.js', array('application'), null, true);
		// Подключаем скрипты
		wp_enqueue_script('payment');
	endif;
	wp_register_script('custom', get_template_directory_uri() . '/js/custom.js', array('jquery'), null, true);
}

//Подключаем Yandex API
add_action('wp_enqueue_scripts', 'add_yandex_api_script');

function add_yandex_api_script() {
	wp_register_script('yandex-maps', get_template_directory_uri() . '/js/yandex-maps.js', array('jquery'), null, true);
	if (is_page_template(array('home.php', 'courses.php', 'course.php', 'event.php')) || is_page(62)) {
		wp_enqueue_script('yandex-maps');
	}
}

//Подключаем Marquiz
add_action('wp_enqueue_scripts', 'add_marquiz_script');

function add_marquiz_script() {
	if (is_single() || is_page_template('home.php')) {
		wp_register_script('marquiz', get_template_directory_uri() . '/js/marquiz.js', false, null, true);
		wp_enqueue_script('marquiz');
	}
}

//Подключаем глобальные JS переменные
add_action('wp_enqueue_scripts', 'add_global_data', 20);

function add_global_data() {
	wp_localize_script('jquery', 'ajax', array('url' => admin_url('admin-ajax.php')));
	if (is_page_template(array('home.php', 'course.php', 'event.php', 'courses.php', 'payment-test.php', 'payment.php', 'payment-with-card.php', 'payment-installment.php')) || is_page(75)) {
		wp_localize_script('jquery', 'rates', array('usd' => CURRENCY_RATES[0],'rub' => CURRENCY_RATES[1]));
	}
}

//Добавляем атрибут async
add_filter('script_loader_tag', 'add_async_attribute', 10, 2);

function add_async_attribute($tag, $handle) {
	$scripts_to_async = array('marquiz');
	foreach($scripts_to_async as $async_script) {
	   if ($async_script === $handle) {
		  return str_replace(' src', ' async src', $tag);
	   }
	}
	return $tag;
}

//Подклюачем AJAX callback функции
add_action('wp_ajax_tabs', 'tabs_callback');
add_action('wp_ajax_nopriv_tabs', 'tabs_callback');

add_action('wp_ajax_courses', 'courses_callback');
add_action('wp_ajax_nopriv_courses', 'courses_callback');

add_action('wp_ajax_portfolio', 'portfolio_callback');
add_action('wp_ajax_nopriv_portfolio', 'portfolio_callback');

add_action('wp_ajax_post_portfolio', 'post_portfolio_callback');
add_action('wp_ajax_nopriv_post_portfolio', 'post_portfolio_callback');

add_action('wp_ajax_payment_alfa', 'payment_alfa_callback');
add_action('wp_ajax_nopriv_payment_alfa', 'payment_alfa_callback');

add_action('wp_ajax_payment_webpay', 'payment_webpay_callback');
add_action('wp_ajax_nopriv_payment_webpay', 'payment_webpay_callback');

add_action('wp_ajax_lecturer', 'lecturer_callback');
add_action('wp_ajax_nopriv_lecturer', 'lecturer_callback');

add_action('wp_ajax_team', 'team_callback');
add_action('wp_ajax_nopriv_team', 'team_callback');

add_action('wp_ajax_currency', 'currency_callback');
add_action('wp_ajax_nopriv_currency', 'currency_callback');

add_action('wp_ajax_add_to_book', 'add_to_book_callback');
add_action('wp_ajax_nopriv_add_to_book', 'add_to_book_callback');

add_action('wp_ajax_blog', 'blog_callback');
add_action('wp_ajax_nopriv_blog', 'blog_callback');

add_action('wp_ajax_lecturers', 'lecturers_callback');
add_action('wp_ajax_nopriv_lecturers', 'lecturers_callback');

add_action('wp_ajax_promocode', 'get_promocode');
add_action('wp_ajax_nopriv_promocode', 'get_promocode');

add_action('wp_ajax_payment_bepaid', 'bepaid_callback');
add_action('wp_ajax_nopriv_payment_bepaid', 'bepaid_callback');

add_action('wp_ajax_amo_crm_lead', 'amocrm_lead_callback');
add_action('wp_ajax_nopriv_amo_crm_lead', 'amocrm_lead_callback');

add_action('wp_ajax_amo_crm_intensive', 'amocrm_intensive_callback');
add_action('wp_ajax_nopriv_amo_crm_intensive', 'amocrm_intensive_callback');

add_action('wp_ajax_amo_crm_call', 'amocrm_call_callback');
add_action('wp_ajax_nopriv_amo_crm_call', 'amocrm_call_callback');

add_action('wp_ajax_amo_crm_free', 'amocrm_free_callback');
add_action('wp_ajax_nopriv_amo_crm_free', 'amocrm_free_callback');

add_action('wp_ajax_personal_data', 'get_personal_data');
add_action('wp_ajax_nopriv_personal_data', 'get_personal_data');

add_action('wp_ajax_currencies', 'currencies_callback');
add_action('wp_ajax_nopriv_currencies', 'currencies_callback');

add_action('wp_ajax_ip_info', 'ip_info_callback');
add_action('wp_ajax_nopriv_ip_info', 'ip_info_callback');

add_action('wp_ajax_lt', 'lt_callback');
add_action('wp_ajax_nopriv_lt', 'lt_callback');

add_action('wp_ajax_installment', 'installment_callback');
add_action('wp_ajax_nopriv_installment', 'installment_callback');

add_action('wp_ajax_installment_debt', 'installment_debt_callback');
add_action('wp_ajax_nopriv_installment_debt', 'installment_debt_callback');

add_action('wpcf7_init', 'wpcf7_add_form_tag_dates');
/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

// BEGIN ACF SETTINGS
if( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page( array(
		'page_title' 	=> 'Настройки сайта',
		'menu_title'	=> 'Настройки',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'icon_url' 		=> 'dashicons-welcome-widgets-menus',
		'position'      => 2,
		'redirect'		=> false
	) );
	
	acf_add_options_sub_page( array(
		'page_title' 	=> 'Настройки Header',
		'menu_title'	=> 'Настройки Header',
		'parent_slug'	=> 'theme-general-settings',
	) );
	
	acf_add_options_sub_page( array(
		'page_title' 	=> 'Настройки Footer',
		'menu_title'	=> 'Настройки Footer',
		'parent_slug'	=> 'theme-general-settings',
	) );
}
// END ACF SETTINGS

// Добавляем кастомный тег для contact form 7
add_filter( 'shortcode_atts_wpcf7', 'custom_shortcode_atts_wpcf7_filter', 10, 3 );
// Отключаем стандартные стили формы
add_filter('wpcf7_autop_or_not', '__return_false');
 
function custom_shortcode_atts_wpcf7_filter( $out, $pairs, $atts ) {
	$my_attributes = array(
		'ums-course-name',
		'ums-course-timetable',
		'ums-course-date',
		'ums-course-address-link',
		'ums-course-address',
		'ums-event-date',
		'ums-event-name',
		'ums-event-address',
		'crm-course-full-title',
		'crm-course-price',
		'crm-course-type',
		'crm-course-time',
		'crm-course-date',
		'crm-course-address',
		'crm-course-lecturer',
		'crm-status-id',
		'crm-tag-date'
	);
    foreach ($my_attributes as $value) {
      if ( isset( $atts[$value] ) ) {
          $out[$value] = $atts[$value];
      }
    }
    return $out;
}

//Breadcrumbs YOAST
add_filter( 'wpseo_breadcrumb_separator', function( $separator ) {
	return '<svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd"
		d="M1.1768 4.67676L0.823242 4.3232L2.64647 2.49998L0.823242 0.676758L1.1768 0.323204L3.35357 2.49998L1.1768 4.67676Z"
		fill="white" />
		</svg>';
} );

//Yoast seo change position priority
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');
function yoasttobottom() {
  return 'high';
}
//BEPAID PAYMENT API
function bepaid_callback() {
	$price_value = $_POST['totalPrice'];
	$customer_name = $_POST['customerName'];
	$product_name = $_POST['productName'];
	$data = array(
		'checkout' => array(
			'version' => '2.1',
			'test' => false,
			'transaction_type' => 'payment',
			'order' => array(
				'amount' => $price_value,
				'currency' => 'BYN',
				'description' => 'Оплата курса: ' . $product_name
			),
			'settings' => array(
				'language' => 'ru',
				'success_url' => RETURN_URL
			),
			'customer' => array(
				'name' => $customer_name
			)
		)
	);
	$curl = curl_init();
	$curl_options = array(
		CURLOPT_URL => BEPAID_CHECKOUT_URL,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic '. base64_encode(BEPAID_ID . ':' . BEPAID_SECRET_KEY),
			'Content-Type: application/json',
			'Accept: application/json'
		),
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => json_encode($data)
	);
	curl_setopt_array($curl, $curl_options);
	$response = curl_exec($curl);
	curl_close($curl);
	echo $response;
	wp_die();
}
//ALFA-BANK PAYMENT API
function alfa_gateway($method, $data){
	$curl = curl_init();
	$curl_options = array(
		CURLOPT_URL => ALFA_GATEWAY_URL.$method,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => http_build_query($data)
	);
	curl_setopt_array($curl, $curl_options);
	$response = curl_exec($curl);
	// $response = json_decode($response, true);
	curl_close($curl);
	return $response;
}

function payment_alfa_callback(){
	$orderDescription;
	$orderTitle = $_POST['productName'];
	$orderSaleType = $_POST['customerSaleType'];
	$orderSaleValue = $_POST['customerSaleValue'];
	$customerName = $_POST['customerName'];
	$customerPaymentLevel = $_POST['customerPaymentLevel'];
	$orderAmount = $_POST['totalPrice'];
	if ($customerPaymentLevel){
		$orderDescription = $customerName.', '.$orderTitle.', '.$customerPaymentLevel.', '.$orderSaleType.' - '.$orderSaleValue;
	}
	else{
		$orderDescription = $customerName.', '.$orderTitle.', '.$orderSaleType.' - '.$orderSaleValue;
	}
	$data = array(
		'userName' => ALFA_USERNAME,
		'password' => ALFA_PASSWORD,
		'orderNumber' => substr(base_convert(sha1(uniqid(mt_rand(), true)), 16, 8), 0, 7),
		'amount' => $orderAmount,
		'description' => $orderDescription,
		'currency' => 933,
		'returnUrl' => RETURN_URL
	);
	$response = alfa_gateway('register.do', $data);
	echo $response;
	wp_die();
}
//AJAX
function tabs_callback(){
	$term_id = $_POST['id'];
// 	$test_course_template = $_POST['showTestPost'];
	$show_full_posts = $_POST['showFullPosts'];
	if ($show_full_posts) {
		$term_arg = array(
			'cat'=>$term_id,
			'posts_per_page'=>-1,
			'post_status'=>'publish',
			'meta_key'=>'ums_course_info_start',
			'orderby'=>'meta_value',
			'order'=>'ASC'
		);
	}
	else {
		$term_arg = array(
			'cat'=>$term_id,
			'posts_per_page'=>'3',
			'post_status'=>'publish',
			'meta_key'=>'ums_course_info_start',
			'orderby'=>'meta_value',
			'order'=>'ASC',
			'paged'=>1
		);
	}
	$counter = 0;
	$term_query = new WP_Query($term_arg);
	$max_num_pages = $term_query->max_num_pages;
	//Currencies rates
	$ums_rub_rate = CURRENCY_RATES[1];
	$ums_usd_rate = CURRENCY_RATES[0];
// 	if ($test_course_template == true): $test_course_template = true; endif;
	while ($term_query->have_posts()): $term_query->the_post();
		include(locate_template('template-parts/course-item.php', false, false));
	endwhile;
	wp_reset_postdata();
	wp_die();
}

function courses_callback(){
	$current_page = $_POST['current_page'] + 1;
	$post_arg = array(
		'cat'=>array($_POST['id']),
		'meta_key'=>'ums_course_info_start',
		'orderby'=>'meta_value',
		'post_status'=>'publish',
		'order'=>'ASC',
		'posts_per_page'=>'3',
		'paged'=>$current_page
	);
	// $counter = 3;
	$post_query = new WP_Query($post_arg);
	$term_max_num_pages = $post_query->max_num_pages;
	$ums_rub_rate = CURRENCY_RATES[1];
	$ums_usd_rate = CURRENCY_RATES[0];
	while ($post_query->have_posts()): $post_query->the_post();
		include(locate_template('template-parts/course-item.php', false, false));
	endwhile;
	wp_reset_postdata();
	wp_die();
}

function portfolio_callback(){
	$current_page = $_POST['currentPage'] + 1;
	$post_arg = array(
		'post_type' => 'post',
		'cat' => 7,
		'posts_per_page' => 6,
		'post_status' => 'publish',
		'meta_key' => 'ums_portfolio_on_home',
        'meta_value' => 'yes',
		'order' => 'DESC',
		'orderby' => 'date',
		'paged' => $current_page
	);
	$post_query = new WP_Query($post_arg);
	while ($post_query->have_posts()): $post_query->the_post();
		get_template_part('template-parts/portfolio', 'item');
	endwhile;
	wp_reset_postdata();
	wp_die();
}

function post_portfolio_callback(){
	$current_page = $_POST['currentPage'] + 1;
	$post_tag = $_POST['tag'];
	$post_arg = array(
		'cat' => 7,
		'post_type' => 'post',
		'post_status' => 'publish',
		'tag' => $post_tag,
		'posts_per_page' => 6,
		'orderby' => 'date',
		'paged' => $current_page
	);
	$post_query = new WP_Query($post_arg);
	while ($post_query->have_posts()): $post_query->the_post();
		get_template_part('template-parts/portfolio', 'item');
	endwhile;
	wp_reset_postdata();
	wp_die();
}

function lecturer_callback(){
	$post_id = $_POST['id'];
	$post_object = get_post($post_id);
	include(locate_template('template-parts/modal/lecturer.php', false, false));
	wp_die();
}

function team_callback(){
	$post_id = $_POST['id'];
	include(locate_template('template-parts/modal/team-ajax.php', false, false));
	wp_die();
}

function lecturers_callback(){
	$tag_id = $_POST['id'];
	$lecturers = get_field('ums_lecturers_list', 1641);
	foreach($lecturers as $post):
		setup_postdata($post);
		$tags = wp_get_post_tags($post->ID);
		if ($tags[0]->term_id == $tag_id):
			include(locate_template('template-parts/lecturer-item.php', false, false));
		elseif ($tag_id == 'all'):
			include(locate_template('template-parts/lecturer-item.php', false, false));
		endif;
	endforeach; wp_reset_postdata();
	wp_die();
}

function payment_webpay_callback(){
	$wsb_store_id = $_POST['storeId'];
	$wsb_total = $_POST['totalPrice'];
	$wsb_invoice_item_price = $_POST['totalPrice'];
	$wsb_invoice_item_name = $_POST['productName'];
	$wsb_seed = time();
	$wsb_order_num = substr(base_convert(sha1(uniqid(mt_rand(), true)), 16, 8), 0, 7);
	$wsb_test = 0;
	$wsb_currency_id = "BYN";
	$secret_key = "A=f/hTubvc6hny2w";
	$signature = sha1($wsb_seed.$wsb_store_id.$wsb_order_num.$wsb_test.$wsb_currency_id.$wsb_total.$secret_key);
	$response = [
		'wsb_seed'=>$wsb_seed,
		'wsb_order_num'=>$wsb_order_num,
		'wsb_signature'=>$signature,
		'wsb_invoice_item_price'=>$wsb_invoice_item_price,
		'wsb_invoice_item_name'=>$wsb_invoice_item_name
	];
	echo json_encode($response);
	wp_die();
}

//Custom fields for CF7


//SCHEMA
add_filter( 'wpseo_json_ld_output', '__return_false' );

add_action('wp_head', 'get_schema_home_page', 20);

function get_schema_home_page(){
	if (is_page_template('home.php')) { ?>
		<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "Organization",
			"name": "UX Mind School - Школа дизайна в Минске",
			"legalName": "UX Mind School",
			"url" : "https://ux-school.by",
			"description": "Курсы UX/UI дизайна в Минске, проектирование интерфейсов. Обучение UX/UI Design, помощь в трудоустройстве, рассрочка, скидки студентам 10%.",
			"image": "https://ux-school.by/wp-content/uploads/2020/06/ums-logo.svg",
			"founder": [{
				"@type": "Person",
                "name": "Игорь Колесень"
			}],
			"contactPoint": {
            	"@type": "ContactPoint",
            	"contactType": "Customer Service",
            	"email": "hello@ux-school.by",
            	"telephone": "+375 (29) 863-06-57"
        	},
			"telephone": "+375 (29) 863-06-57",
			"address": {
				"@type": "PostalAddress", 
				"streetAddress": "ул. Бядули, 13, к. 5",
				"addressLocality": "Минск",
            	"postalCode": "220034",
            	"addressCountry": "Беларусь"
			},
			"sameAs": [
            	"https://www.instagram.com/ux_mind_school/",
            	"https://www.youtube.com/channel/UCr3AaLhUzP8aeXPf3_LUADQ",
            	"https://dribbble.com/ux-mind",
            	"https://www.behance.net/UX-Mind",
            	"https://vk.com/uxschool"
        	],
			"aggregateRating": {
				"@type": "AggregateRating",
				"worstRating" : 5,
				"bestRating" : 5,
				"ratingValue": "5", 
				"reviewCount": "47"
			}
		}
		</script>
	<?php }
}

add_filter('bcn_breadcrumb_title', 'my_breadcrumb_title_swapper', 3, 10);

function my_breadcrumb_title_swapper($title, $type, $id) {
	if (in_array('home', $type)) {
		$title = __('Главная');
	}
    return $title;
}

add_action('wp_head', 'add_schema_breadcrumbs', 30);

function add_schema_breadcrumbs(){
	if ((is_page() || is_single()) && !is_page_template('home.php')) { ?>
		<script type="application/ld+json"><?php bcn_display_json_ld(); ?></script>
	<?php }
}

add_action('wp_footer', 'get_schema_course_page', 99);

function get_schema_course_page(){
	if (is_page_template('course.php')) {
		$queried_object = get_queried_object();
		$template_id = $queried_object->ID;
		$ums_course_questions = get_field('ums_course_questions', $template_id);
		$ums_questions_list = array();
		foreach ($ums_course_questions as $question):
			$question_array = array(
				'@type' => 'Question',
				'name' => $question->post_title,
				'acceptedAnswer' => array(
					'@type' => 'Answer',
					'text' => esc_html($question->post_content)
				)
			);
			array_push($ums_questions_list, $question_array);
		endforeach; wp_reset_postdata();
		$ums_base_questions_array = array(
			'@context' => 'https://schema.org',
			'@type' => 'FAQPage',
			'mainEntity' => $ums_questions_list
		);
		$json_data = json_encode($ums_base_questions_array, true);
		?>
		<script type="application/ld+json"><?php echo $json_data; ?></script><?php }
}

//Timetable function
function get_timetable_list($term_id, $post_id, $template_id){
	if ($post_id):
		include(locate_template('template-parts/course-timetable.php', false, false));
	endif;
}

function uxmindschool_stop_404_guessing($url){
	return (is_404()) ? false : $url;
}
add_filter('redirect_canonical', 'uxmindschool_stop_404_guessing');

//Custom functions
function get_ums_currency($country) {
	return 'BYN';
}
function get_currency_rate($currency) {
	if ( $currency === 'USD' ) {
		return USD_RATE;
	}
	return RUB_RATE;
}

function get_price_in_currency($value, $currency, $currency_rate) {
	if ($currency == 'RUB') {
		return round(($value * 100) / $currency_rate, 0);
	}
	return round($value / $currency_rate, 0);
}

function blog_callback() {
	$tag_id = $_POST['id'];
	$blog_settings = array(
		'post_type' => 'post',
		'post_status' => 'publish',
		'cat' => 12,
		'tag__in' => $tag_id,
		'posts_per_page' => 10
	);
	$blog_query = new WP_Query($blog_settings);
	if ($blog_query->have_posts()): while ($blog_query->have_posts()): $blog_query->the_post();
		// $tags = wp_get_post_tags($post->ID);
		include(locate_template('template-parts/post-item.php', false, false));
	endwhile; endif; wp_reset_postdata();
	wp_die();
}

//SendPulse
function get_sendpulse_token() {
	$curl = curl_init();
	$data = array(
		'grant_type' => 'client_credentials',
		'client_id' => SENDPULSE_ID,
		'client_secret' => SENDPULSE_SECRET
	);
	$curl_options = array(
		CURLOPT_URL => 'https://api.sendpulse.com/oauth/access_token',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => http_build_query($data)
	);
	curl_setopt_array($curl, $curl_options);
	$response = curl_exec($curl);
	curl_close($curl);
	return json_decode($response, true);
}

function add_to_book_callback() {
	$customer_email = $_POST['email'];
	$address_book_id = $_POST['id'];
	$sendpulse_token = get_sendpulse_token();
	$curl = curl_init();
	$data = array(
		'id' => $address_book_id,
		'emails' => array(
			array(
				'email' => $customer_email
			)
		)
	);
	$curl_options = array(
		CURLOPT_URL => SENDPULSE_URL.'addressbooks/'.$address_book_id.'/emails',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HTTPHEADER => array('Authorization: ' . $sendpulse_token['token_type'] . ' ' . $sendpulse_token['access_token']),
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => http_build_query($data)
	);
	curl_setopt_array($curl, $curl_options);
	$response = curl_exec($curl);
	$response = json_decode($response, true);
	if ($response['result'] == 'true' && ($address_book_id == 89064264 || $address_book_id == 89064300)) {
		$resp = send_email_to_client($address_book_id, $customer_email, $sendpulse_token);
		echo json_decode($resp);
	}
	else {
		echo json_encode($response, true);
	}
	wp_die();
}

function get_amocrm_curl_settings($link, $headers, $data, $request, $params) {
	if ($request == 'GET'):
		return [
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_USERAGENT => 'amoCRM-oAuth-client/1.0',
			CURLOPT_URL => $link . $params,
			CURLOPT_HTTPHEADER => $headers,
			CURLOPT_HEADER => false,
			CURLOPT_SSL_VERIFYPEER => 1,
			CURLOPT_SSL_VERIFYHOST => 2
		];
	endif;
	return [
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_USERAGENT => 'amoCRM-oAuth-client/1.0',
		CURLOPT_URL => $link,
		CURLOPT_HTTPHEADER => $headers,
		CURLOPT_HEADER => false,
		CURLOPT_CUSTOMREQUEST => $request,
		CURLOPT_POSTFIELDS => json_encode($data),
		CURLOPT_SSL_VERIFYPEER => 1,
		CURLOPT_SSL_VERIFYHOST => 2
	];
}

function get_amocrm_new_access_data($code) {
	$link = AMOCRM_USER . 'oauth2/access_token';
	
	$data = [
		'client_id' => AMOCRM_CLIENT_ID,
		'client_secret' => AMOCRM_CLIENT_SECRET,
		'grant_type' => 'refresh_token',
		'refresh_token' => $code,
		'redirect_uri' => AMOCRM_REDIRECT_URI,
	];

	$headers = ['Content-Type:application/json'];

	$curl_settings = get_amocrm_curl_settings($link, $headers, $data, 'POST', '');
	$curl = curl_init();
	curl_setopt_array($curl, $curl_settings);
	$out = curl_exec($curl);
	curl_close($curl);
	$response = json_decode($out, true);
	//Update database
	$resp = update_amocrm_table_data($response['access_token'], $response['refresh_token']);
	return;
}

function make_amocrm_api_call($method, $data, $request, $params) {
	$link = AMOCRM_USER . 'api/v4/' . $method;
	$crm_data = get_amocrm_table_data();
	$access_token = $crm_data[0]->atoken;
	$refresh_token = $crm_data[0]->rtoken;

	if ($request == 'GET'):
		$headers = [
			'Authorization: Bearer ' . $access_token
		];
	else:
		$headers = [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $access_token
		];
	endif;

	$curl_settings = get_amocrm_curl_settings($link, $headers, $data, $request, $params);
	$curl = curl_init();
	curl_setopt_array($curl, $curl_settings);
	$out = curl_exec($curl);
	$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);
	if ($code == 401) {
		get_amocrm_new_access_data($refresh_token);
		make_amocrm_api_call($method, $data, $request, $params);
	}
	return $out;
}

function get_amocrm_contacts($customer_telephone) {
	$api_response = make_amocrm_api_call('contacts', [], 'GET', '?limit=250');
	$decoded_api_response = json_decode($api_response, true);
	$contacts = $decoded_api_response['_embedded']['contacts'];
	$field_id = 149693;
	$contact_id;

	foreach($contacts as $contact):
		$custom_fields = $contact['custom_fields_values'];
		$contact_id = $contact['id'];
		foreach($custom_fields as $custom_field):
			if (array_search($field_id, $custom_field)) {
				if ((int)$custom_field['values'][0]['value'] == $customer_telephone) {
					return $contact_id;
				}
			}
		endforeach;
	endforeach;

	return null;
}

function amocrm_intensive_callback() {
	//Получаем данные запроса
	$data = $_POST['data'];
	//Получаем id пользователся
	$contact_id = get_amocrm_contacts($data['customer']['telephone']);
	//Проверяем существует ли пользователь
	if ($contact_id) {
		//Создаем тег
		$tag = $data['tag']['name'];
		//Получаем модель контакта
		$contact = json_decode(make_amocrm_api_call('contacts/' . $contact_id, [], 'GET', ''), true);
		//Получаем теги контакта
		$contact_tags = $contact['_embedded']['tags'];
		//Обрабатываем теги
		$filter = array_filter($contact_tags, function($array) {
			return ($array['name'] != $tag);
		});
		array_push($filter, array('name' => $tag));
		//Создаем данные для отправки
		$post_data = array(
			'custom_fields_values' => array(
				array(
					'field_id' => 312215,
					'values' => array(
						array(
							'value' => $data['intensive']['name']
						)
					)
				),
				array(
					'field_id' => 312217,
					'values' => array(
						array(
							'value' => (int)$data['intensive']['timestamp']
						)
					)
				)
			),
			'_embedded' => array(
				'tags' => $filter
			)
		);
		$api_response = make_amocrm_api_call('contacts/' . $contact_id, $post_data, 'PATCH', '');
	}
	else {
		$post_data = array(
			array(
				'name' => $data['name'],
				'custom_fields_values' => array(
					array(
						'field_id' => 149693,
						'values' => array(
							array(
								'value' => $data['customer']['telephone'],
								'enum_code' => 'WORK'
							)
						)
					),
					array(
						'field_id' => 149695,
						'values' => array(
							array(
								'value' => $data['customer']['email'],
								'enum_code' => 'WORK'
							)
						)
					),
					array(
						'field_id' => 312215,
						'values' => array(
							array(
								'value' => $data['intensive']['name']
							)
						)
					),
					array(
						'field_id' => 312217,
						'values' => array(
							array(
								'value' => (int)$data['intensive']['timestamp']
							)
						)
					)
				),
				'_embedded' => array(
					'tags' => array(
						array(
							'name' => $data['tag']['name']
						)
					)
				)
			)
		);
		$api_response = make_amocrm_api_call('contacts', $post_data, 'POST', '');
	}
	echo $api_response;
	wp_die();
}

function amocrm_call_callback() {
	$data = $_POST['data'];
	//Производим поиск контакта по номеру телефона
	$contact_id = get_amocrm_contacts($data['customer']['telephone']);
	if ($contact_id) {
		//Создаем тег
		$tag = $data['tag']['name'];
		//Получаем модель контакта
		$contact = json_decode(make_amocrm_api_call('contacts/' . $contact_id, [], 'GET', ''), true);
		//Получаем теги контакта
		$contact_tags = $contact['_embedded']['tags'];
		//Обрабатываем теги
		$filter = array_filter($contact_tags, function($array) {
			return ($array['name'] != $tag);
		});
		array_push($filter, array('name' => $tag));
		$post_data = array(
			array(
				'custom_fields_values' => array(
					array(
						'field_id' => 313453,
						'values' => array(
							array(
								'value' => $data['customer']['message']
							)
						)
					)
				),
				'_embedded' => array(
					'tags' => $filter
				)
			)
		);
		$api_response = make_amocrm_api_call('contacts/' . $contact_id, $post_data, 'PATCH', '');
	}
	else {
		$post_data = array(
			array(
				'name' => $data['customer']['name'],
				'custom_fields_values' => array(
					array(
						'field_id' => 149693,
						'values' => array(
							array(
								'value' => $data['customer']['telephone'],
								'enum_code' => 'WORK'
							)
						)
					),
					array(
						'field_id' => 149695,
						'values' => array(
							array(
								'value' => $data['customer']['email'],
								'enum_code' => 'WORK'
							)
						)
					),
					array(
						'field_id' => 313453,
						'values' => array(
							array(
								'value' => $data['customer']['message']
							)
						)
					)
				),
				'_embedded' => array(
					'tags' => array(
						array(
							'name' => $data['tag']['name']
						)
					)
				)
			)
		);
	
		$api_response = make_amocrm_api_call('contacts', $post_data, 'POST', '');
	}
	echo $api_response;
	wp_die();
}

function amocrm_free_callback() {
	$data = $_POST['data'];
	//Производим поиск контакта по номеру телефона
	$contact_id = get_amocrm_contacts($data['customer']['telephone']);
	if ($contact_id) {
		//Создаем тег
		$tag = $data['tag']['name'];
		//Получаем модель контакта
		$contact = json_decode(make_amocrm_api_call('contacts/' . $contact_id, [], 'GET', ''), true);
		//Получаем теги контакта
		$contact_tags = $contact['_embedded']['tags'];
		//Обрабатываем теги
		$filter = array_filter($contact_tags, function($array) {
			return ($array['name'] != $tag);
		});
		array_push($filter, array('name' => $tag));
		$post_data = array(
			'_embedded' => array(
				'tags' => $filter
			)
		);
		$api_response = make_amocrm_api_call('contacts/' . $contact_id, $post_data, 'PATCH', '');
	}
	else {
		$post_data = array(
			array(
				'name' => $data['customer']['name'],
				'custom_fields_values' => array(
					array(
						'field_id' => 149695,
						'values' => array(
							array(
								'value' => $data['customer']['email'],
								'enum_code' => 'WORK'
							)
						)
					),
					array(
						'field_id' => 149693,
						'values' => array(
							array(
								'value' => $data['customer']['telephone'],
								'enum_code' => 'WORK'
							)
						)
					)
				),
				'_embedded' => array(
					'tags' => array(
						array(
							'name' => $data['tag']['name']
						)
					)
				)
			)
		);
		$api_response = make_amocrm_api_call('contacts', $post_data, 'POST', '');
	}
	echo $api_response;
	wp_die();
}

function amocrm_lead_callback() {
	$data = $_POST['data'];
	$lead_data = array(
		array(
			'name' => $data['title'],
			'pipeline_id' => 3153721,
			'status_id' => (int)$data['statusId'],
			'custom_fields_values' => array(
				array(
					'field_id' => 339289,
					'values' => array(
						array(
							'value' => $data['price']
						)
					)
				),
				array(
					'field_id' => 307539,
					'values' => array(
						array(
							'value' => $data['name']
						)
					)
				),
				array(
					'field_id' => 307537,
					'values' => array(
						array(
							'value' => $data['type']
						)
					)
				),
				array(
					'field_id' => 307547,
					'values' => array(
						array(
							'value' => $data['time']
						)
					)
				),
				array(
					'field_id' => 307541,
					'values' => array(
						array(
							'value' => (int)$data['date']
						)
					)
				),
				array(
					'field_id' => 307551,
					'values' => array(
						array(
							'value' => $data['address']
						)
					)
				)
			),
			'_embedded' => array(
				'tags' => array(
					array(
						'name' => $data['time']
					),
					array(
						'name' => $data['type']
					),
					array(
						'name' => $data['tag']['value']
					)
				)
			)
		)
	);

	//Создаем сделку в crm
	$lead = json_decode(make_amocrm_api_call('leads', $lead_data, 'POST', ''), true);
	//Получаем id сделки
	$lead_id = $lead['_embedded']['leads'][0]['id'];
	//Производим поиск контакта по номеру телефона
	$contact_id = get_amocrm_contacts($data['customer']['telephone']);

	if ($contact_id) {
		$entity_data = array(
			array(
				'to_entity_id' => (int)$contact_id,
				'to_entity_type' => 'contacts',
				'metadata' => array(
					'is_main' => true
				)
			)
		);
	}
	else {
		$contact_post_data = array(
			array(
				'name' => $data['customer']['name'],
				'custom_fields_values' => array(
					array(
						'field_id' => 149693,
						'values' => array(
							array(
								'value' => $data['customer']['telephone'],
								'enum_code' => 'WORK'
							)
						)
					),
					array(
						'field_id' => 149695,
						'values' => array(
							array(
								'value' => $data['customer']['email'],
								'enum_code' => 'WORK'
							)
						)
					)
				)
			)
		);
		$contact = json_decode(make_amocrm_api_call('contacts', $contact_post_data, 'POST', ''), true);
		$contact_id = $contact['_embedded']['contacts'][0]['id'];
		$entity_data = array(
			array(
				'to_entity_id' => (int)$contact_id,
				'to_entity_type' => 'contacts',
				'metadata' => array(
					'is_main' => true,
				)
			)
		);
	}
	
	//Создаем связку между контактом и сделкой
	$linked_entities_response = make_amocrm_api_call('leads' . $lead_id . '/link', $entity_data, 'POST', '');
	echo $linked_entities_response;
	wp_die();
}

function get_amocrm_table_data() {
	global $wpdb;
	return $wpdb->get_results('SELECT * FROM uVYROu_crm');
}

function update_amocrm_table_data($atoken, $rtoken) {
	global $wpdb;
	return $wpdb->replace('uVYROu_crm', array('id' => 1, 'atoken' => $atoken, 'rtoken' => $rtoken));
}

function send_email_to_client($address_book_id, $customer_email, $sendpulse_token) {
	$curl = curl_init();
	$data = array();
	if ($address_book_id == 89064264) {
		$data = array(
			'email' => array(
				'subject' => 'Начни учиться бесплатно',
				'template' => array(
					'id' => 1293651
				),
				'from' => array(
					'name' => 'Школа дизайна UX Mind School',
					'email' => 'hello@ux-school.by'
				),
				'to' => array(
					array(
						'email' => $customer_email
						)
					)
				)
			);
		}
		else {
			$templates = ['1297258', '1298936', '1298931'];
			$rand_number = rand(0,2);
			$data = array(
				'email' => array(
					'subject' => 'Результаты теста',
					'template' => array(
						'id' => (int)$templates[$rand_number]
					),
					'from' => array(
						'name' => 'Школа дизайна UX Mind School',
						'email' => 'hello@ux-school.by'
					),
					'to' => array(
						array(
							'email' => $customer_email
							)
						)
					)
				);
			}
	$curl_options = array(
		CURLOPT_URL => SENDPULSE_URL.'smtp/emails',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HTTPHEADER => array('Authorization: ' . $sendpulse_token['token_type'] . ' ' . $sendpulse_token['access_token']),
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => http_build_query($data)
	);
	curl_setopt_array($curl, $curl_options);
	$response = curl_exec($curl);
	$response = json_encode($response, true);
	return $response;
}

/* 
 * Изменение вывода галереи через шоткод 
 * Смотреть функцию gallery_shortcode в http://wp-kama.ru/filecode/wp-includes/media.php
 * $output = apply_filters( 'post_gallery', '', $attr );
 */
add_filter('post_gallery', 'my_gallery_output', 10, 2);
function my_gallery_output( $output, $attr ){
	$ids_arr = explode(',', $attr['ids']);
	$ids_arr = array_map('trim', $ids_arr );

	$pictures = get_posts( array(
		'posts_per_page' => -1,
		'post__in'       => $ids_arr,
		'post_type'      => 'attachment',
		'orderby'        => 'post__in',
	) );

	if( ! $pictures ) return 'Запрос вернул пустой результат.';

	// Вывод
	$out = '<div class="inner-carousel"><div class="swiper-container inner-carousel__grid"><div class="swiper-wrapper">';

	// Выводим каждую картинку из галереи
	foreach( $pictures as $pic ){
		$src = $pic->guid;
		$t = esc_attr( $pic->post_title );
		$title = ( $t && false === strpos($src, $t)  ) ? $t : '';

		$caption = ( $pic->post_excerpt != '' ? $pic->post_excerpt : $title );

		$out .= '
		<div class="swiper-slide inner-carousel__item">
			<figure class="inner-carousel__item-figure"><img src="'. esc_url($src) .'" alt="'. $title .'" /></figure>
		</div>';
	}

	$out .= '</div></div>
	<div class="swiper-pagination inner-carousel__pagination"></div>
	<button type="button" class="inner-carousel__btn inner-carousel__btn-prev">
		<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M9.29282 17.707L10.707 16.2928L3.41414 8.99992L10.707 1.70703L9.29282 0.292816L0.585711 8.99992L9.29282 17.707Z" fill="#9E98A3"></path>
		</svg>
	</button>
	<button type="button" class="inner-carousel__btn inner-carousel__btn-next">
		<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M1.70718 17.707L0.292969 16.2928L7.58586 8.99992L0.292968 1.70703L1.70718 0.292816L10.4143 8.99992L1.70718 17.707Z" fill="#9E98A3"></path>
		</svg>
	</button>
	</div>';

	return $out;
}

function get_promocode() {
	$promocodes_list = array_filter(get_field('ums_promocodes', 2), "check_date");
	$response = json_encode($promocodes_list);
	echo $response;
	wp_die();
}

function check_date($array) {
	$date_now = new DateTime();
	$date_now_timestamp = $date_now->getTimestamp();
	//Promocode
	$promocode_date = DateTime::createFromFormat('d/m/Y', $array['date']);
	$promocode_timestamp = $promocode_date->getTimestamp();
	if ($date_now_timestamp < $promocode_timestamp) {
		return true;
	}
	else {
		return false;
	}
}

function wpcf7_add_form_tag_dates() {
    wpcf7_add_form_tag( array( 'dates', 'dates*'), 'wpcf7_add_form_tag_dates_handler', array( 'name-attr' => true ) );
}

function wpcf7_add_form_tag_dates_handler( $tag ) {
    $tag = new WPCF7_FormTag( $tag );
    if ( empty( $tag->name ) ) {
        return '';
	}
	$validation_error = wpcf7_get_validation_error( $tag->name );
	$class = wpcf7_form_controls_class( $tag->type );
	if ( $validation_error ) {
        $class .= ' wpcf7-not-valid';
    }
    $atts = array();
    $atts['class'] = $tag->get_class_option( $class );
	$atts['id'] = $tag->get_id_option();
	if ( $tag->is_required() ) {
		$atts['aria-required'] = 'true';
	}
	$atts['aria-invalid'] = $validation_error ? 'true' : 'false';
	$atts['name'] = $tag->name;
	$atts = wpcf7_format_atts( $atts );
	$html = '<select name="test-course-date">';
	$test_course_field = get_field('ums_course_test_dates', 2);
		if ($test_course_field):
			$ums_today_date_object = new DateTime();
			$ums_today_date_object_timestamp = $ums_today_date_object->getTimestamp();
			foreach($test_course_field as $item):
	            $date_field = $item['date'];
	            $date_object = DateTime::createFromFormat('d/m/Y', $date_field);
				$date_object_timestamp = $date_object->getTimestamp();
	            $date_string_formated = date_i18n('j F', $date_object_timestamp);
				if (($date_object_timestamp - $ums_today_date_object_timestamp) >= 0):
					$html.='<option>';
					$html.=''. $date_string_formated .' в '. $item['time'];
					$html.='</option>';
				endif;
			endforeach;
		endif;
	$html.='</select>';
	$html = sprintf( $html, sanitize_html_class( $tag->name ), $atts, $validation_error );
	return $html;
}

//Course schedule functions
function get_schedule_template($id, $short=false) {
	$is_flexible_schedule = get_field('is_flexible_schedule', $id);
	$date_object = DateTime::createFromFormat('d/m/Y', get_field('ums_course_info_start', $id));
	$date_timestamp = $date_object->getTimestamp();
	if (!$short):
		$schedule_template = date_i18n('j F', $date_timestamp) . ' - ';
	else:
		$schedule_template = '';
	endif;
	if ($is_flexible_schedule):
		$schedule = get_field('schedule', $id);
		$schedule_count = count($schedule);
		foreach ($schedule as $item):
			$schedule_count--;
			$schedule_day = $item['day'];
			$schedule_time = $item['time'];
			$schedule_template.=$schedule_day . ' ' . $schedule_time[0]['start'] . '-' . $schedule_time[0]['end'];
			if ($schedule_count !== 0):
				$schedule_template.=', ';
			endif;
		endforeach;
		return $schedule_template;
	else:
		$schedule_days = get_field('schedule_days', $id);
		$schedule_time = get_field('schedule_time', $id);
		return $schedule_template . $schedule_days . ' ' . $schedule_time[0]['start'] . '-' . $schedule_time[0]['end'];
	endif;
}


/* WP_NAV_MENU */
add_filter('walker_nav_menu_start_el', 'my_walker_nav_menu_start_el', 10, 4);

function my_walker_nav_menu_start_el($item_output, $item, $depth, $args) {
	if ($depth == 0){
		$item_output = preg_replace('/<a /', '<a class="menu__link link" ', $item_output, 1);
	}
	else{
		$item_output = preg_replace('/<a /', '<a class="dropdown__link link" ', $item_output, 1);
	}
	if ( 'Primary' == $args->theme_location ) {
		if ($depth == 0){
			$item_output = preg_replace('/<a /', '<a class="menu__link link" ', $item_output, 1);
		}
		else{
			$item_output = preg_replace('/<a /', '<a class="dropdown__link link" ', $item_output, 1);
		}
	}
	else if ( 'Secondary' == $args->theme_location ){
		if ($depth == 0){
			$item_output = preg_replace('/<a /', '<a class="menu__link menu__link_style-dark link" ', $item_output, 1);
		}
		else{
			$item_output = preg_replace('/<a /', '<a class="dropdown__link link" ', $item_output, 1);
		}
	}
	else if ( 'Footer first' == $args->theme_location || 'Footer second' == $args->theme_location ) {
		$item_output = preg_replace('/<a /', '<a class="footer-menu__link" ', $item_output, 1);
	 }
	return $item_output;
}

add_filter('nav_menu_css_class', 'custom_item_class', 10, 4);

function custom_item_class( $classes, $item, $args, $depth ){
	$parent_term_id = get_field('ums_course_parent_term', $item->object_id);
	if ('Primary' == $args->theme_location || 'Secondary' == $args->theme_location) {
		if ($depth == 0){
			$classes = ["menu__item"];
		}
		else{
			$classes = ["dropdown__item"];
		}
	 }
	 else if ( 'Footer first' == $args->theme_location ) {
		$classes = ["footer-menu__item"];
	 }
	else if ( 'Footer second' == $args->theme_location ):
		$term_arg = array(
			'cat' => $parent_term_id,
			'post_status' => 'publish',
			'posts_per_page' => -1
		);
		$term_query = new WP_Query( $term_arg );
		if ( !$term_query->have_posts() ):
			$classes = ["footer-menu__item", "footer-menu__item_visibility-hidden"];
		else:
			$classes = ["footer-menu__item"];
		endif;
	endif;
	return $classes;

}

add_filter('nav_menu_item_id', 'my_css_attributes_filter', 100, 1);
add_filter('page_css_class', 'my_css_attributes_filter', 100, 1);

function my_css_attributes_filter($var) {
  return is_array($var) ? array_intersect($var, array('current-menu-item')) : '';
}

function get_personal_data () {
	$content_page = get_post(3);
	$content_text = apply_filters('the_content', $content_page->post_content);
	echo $content_text;
	wp_die();
}

function ip_info_callback() {
	$curl = curl_init();
	$curl_options = array(
		CURLOPT_URL => 'https://ipinfo.io?token=' . IP_INFO_TOKEN,
		CURLOPT_RETURNTRANSFER => true
	);
	curl_setopt_array($curl, $curl_options);
	$response = curl_exec($curl);
	echo $response;
	wp_die();
}

// Custom image sizes
add_image_size( 'blog-image-size', 360, 240 );
add_image_size( 'portfolio-image-size', 840, 630 );

define('SHOP_CODE_ONLINE', '1403');
define('SHOP_CODE_OFFLINE', '1374');
define('API_ONLINE_URL', 'https://insync2.alfa-bank.by/mBank256/ExtRbc');
define('API_OFFLINE_URL', 'https://93.84.121.106/mBank2/ExtRbc');
define('INSTALLMENT_TYPE', 'PSL');
define('INSTALLMENT_RATE', 15);

// INSTALLMENT
function installment_callback() {
	$installment_data = array(
		'applicationNumber' => $_POST['installment-id'],
		'shopName' => SHOP_CODE_ONLINE,
		'productCode' => INSTALLMENT_TYPE,
		'term' => (int)$_POST['installment-length'],
		'firstName' => $_POST['installment-first-name'],
		'middleName' => $_POST['installment-middle-name'],
		'lastName' => $_POST['installment-last-name'],
		'phoneNumber' => '+375' . preg_replace('/[^0-9]/', '', $_POST['installment-phone-number']),
		'products' => array(
			array(
				'name' => $_POST['installment-course-name'],
				'model' => 'Курс',
				'quantity' => 1,
				'price' => (int)$_POST['installment-price']
			)
		),
		'totalPrice' => (int)$_POST['installment-price']
	);
	$curl = curl_init();
	
	curl_setopt_array($curl, array(
		CURLOPT_URL => API_ONLINE_URL . '/PointOfSale/Order/Save',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => 0,
		CURLOPT_SSL_VERIFYPEER => 0,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_POSTFIELDS => json_encode( $installment_data ),
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	curl_close($curl);
	echo $response;
	wp_die();
}
function get_installment_payment_value( $course_price, $installment_term = 12 ) {
	$installment_month_payment = $course_price / $installment_term;
	$installment_month_percentage_debt = INSTALLMENT_RATE / $installment_term;
	// Only for the first payment
	$installment_debt_payment = $course_price * ($installment_month_percentage_debt / 100);
	while ( $installment_term ) {
		$installment_debt_payment += ( $course_price - $installment_month_payment ) * ( $installment_month_percentage_debt / 100 );
		$installment_term--;
		$course_price = $course_price - $installment_month_payment;
	}
	return $installment_debt_payment;
}

remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );

// COURSE TEMPLATE SCHEDULE
function get_course_schedule_layout( $term_id, $course_post_id, $template_id ) {
	$options_html = '';
	$timetable_arg = array(
		'cat' => $term_id,
		'post_type' => 'post',
		'post_status' => 'publish',
		'meta_key' => 'ums_course_info_start',
		'orderby' => 'meta_value',
		'order' => 'ASC',
		'posts_per_page' => -1
	);
	$timetable_query = new WP_Query( $timetable_arg );
	$timetable_posts_count = $timetable_query->post_count;
	if ( $timetable_posts_count > 1 ):
		while ( $timetable_query->have_posts() ): $timetable_query->the_post();
		$post_id = get_the_id( $post );
		$options_html.='<option ';
		if ( $course_post_id == $post_id ):
			$options_html.='selected ';
		endif;
		$options_html.='value="' . esc_url( get_page_link( $template_id ) ) . '?id=' . $post_id . '">';
		$options_html.=get_schedule_template( $post_id );
		$options_html.='</option>';
		endwhile;
		wp_reset_postdata();
	else:
		$options_html.='<option selected ';
		$options_html.='value="' . esc_url( get_page_link( $template_id ) ) . '?id=' . $post_id . '">';
		$options_html.=get_schedule_template( $course_post_id );
		$options_html.='</option>';
	endif;
	return $options_html;
}