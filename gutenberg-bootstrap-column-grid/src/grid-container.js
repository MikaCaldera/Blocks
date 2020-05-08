import { registerBlockType } from '@wordpress/blocks';
import {
  InnerBlocks,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType( 'create-block/grid-container', {
	title: __( 'Bootstrap Grid Block', 'create-block' ),
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'create-block'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		html: false,
  },
  attributes: {
    container: {
      type: 'string',
      default: 'no-container'
    },
    backgroundColor: {
      type: 'string',
      default: 'tranparent'
    },
  },
  
  edit( { className, attributes, setAttributes } ) {

    const ALLOWED_BLOCKS = [
      'create-block/column-card',
      'create-block/column-item',
    ]

    const { container, backgroundColor } = attributes;
    return (
      <div className={ className }>
      <InspectorControls>
          <PanelBody title={ __( 'Block settings' ) } initialOpen={true}>
          <SelectControl
              label="Container"
              help="Select if this block has a container inside of it."
              value={container}
              options={[
                { label: "Container", value: "container" },
                { label: "No Container", value: "no-container" },
              ]}
              onChange={value => {
                setAttributes({ container: value });
              }}
            />
          </PanelBody>
          <PanelBody title={ __( 'Color settings' ) } isnitialOpen={false}>
            <label className="blocks-base-control__label">Background Color</label>
            <ColorPalette
              value={ backgroundColor }
              onChange={ value => {
                setAttributes({backgroundColor: value})
              }}
            />
          </PanelBody>
          </InspectorControls>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
        />
      </div>
    );
	},

	save({ attributes }) {

		const hasContainer = attributes.container;
		const bgColor = {
			backgroundColor: attributes.backgroundColor
		}

		return (
      <div className="bootstrap-grid" style={bgColor}>
				<div className={hasContainer}>
          <div className="row">
        	  <InnerBlocks.Content />
          </div>
				</div>
      </div>
    );
	},
} );