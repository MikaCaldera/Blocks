import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  InnerBlocks,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
} from '@wordpress/components';

registerBlockType( 'create-block/general-content', {

	title: __( 'General Content', 'create-block' ),
	description: __(
		'General content block. Adds options for a container and background color',
		'create-block'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		html: false,
		align: true,
	},
	attributes: {
    container: {
      type: 'string',
      default: 'container'
    },
    backgroundColor: {
      type: 'string',
      default: 'tranparent'
    },
  },


	edit( { className, attributes, setAttributes } ) {
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
					<InnerBlocks />
      </div>
    );
  },


	save({ attributes }) {
		const hasContainer = attributes.container;
		const bgColor = {
			backgroundColor: attributes.backgroundColor
		}

		console.log(bgColor)

		return (
      <div className="general-content-block" style={bgColor}>
				<div className={hasContainer}>
        	<InnerBlocks.Content />
				</div>
      </div>
    );
	},
} );
