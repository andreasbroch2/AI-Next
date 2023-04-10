import Hardware from './hardware';
import PropTypes from 'prop-types';

const Hardwares = ( {hardwares} ) => {
	return (
		<div className="all-blog-posts-container grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
			{
				hardwares.map( ( hardware, index ) => {
					return (
						<div key={`${hardware?.id}-${index}` ?? ''} className="blog-box">
							<Hardware hardware={hardware}/>
						</div>
					);
				} )
			}
		</div>
	);
};

Hardwares.propTypes = {
	automations: PropTypes.array
};

Hardwares.defaultProps = {
	automations: []
};

export default Hardwares;
