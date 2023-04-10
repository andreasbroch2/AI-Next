import Automation from './automation';
import PropTypes from 'prop-types';

const Automations = ( {automations} ) => {
	return (
		<div className="all-blog-posts-container grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
			{
				automations.map( ( automation, index ) => {
					return (
						<div key={`${automation?.id}-${index}` ?? ''} className="blog-box cursor-pointer automation-box">
							<Automation automation={automation}/>
						</div>
					);
				} )
			}
		</div>
	);
};

Automations.propTypes = {
	automations: PropTypes.array
};

Automations.defaultProps = {
	automations: []
};

export default Automations;
