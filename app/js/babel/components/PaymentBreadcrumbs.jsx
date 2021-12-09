export const PaymentBreadcrumbs = () => {
	return (
		<div className="breadcrumbs breadcrumbs_style-dark template__breadcrumbs">
			{/* HERE MUST BE A BREADCRUMBS QUERY */}
			<span property="itemListElement" typeof="ListItem">
				<a
					property="item"
					typeof="WebPage"
					title="Перейти к Главная."
					href="https://dev.ux-mind.pro"
					className="home"
				>
					<span property="name">Главная</span>
				</a>
			</span>
			<span property="itemListElement" typeof="ListItem">
				<span property="name" className="post post-page current-item">
					Оплатить курс
				</span>
			</span>
		</div>
	);
};
