const Hardware = ( {hardware} ) => {
	return (
		<div className="mb-8">
					<h2 className="font-bold mb-3 text-lg" dangerouslySetInnerHTML={{__html: hardware?.title ?? '' }}/>
			<div dangerouslySetInnerHTML={{__html: hardware?.content ?? '' }}/>
		</div>
	);
};

export default Hardware;
