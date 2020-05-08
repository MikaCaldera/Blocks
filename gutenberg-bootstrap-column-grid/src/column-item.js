import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
} from '@wordpress/components';
import { withState } from '@wordpress/compose';

registerBlockType( 'create-block/column-item', {
	title: __( 'Bootstrap Column', 'create-block' ),
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
    column: {
      type: 'string',
      default: '12'
    },
    columnBP: {
      type: 'string',
      default: 'md'
    },
  },

  parent: ["create-block/grid-container"],

	edit( { className, attributes, setAttributes } ) {

    const { column, columnBP } = attributes;

    return (
      <div className={ className } bg-dark>
      <InspectorControls>
          <PanelBody title={ __( 'Block settings' ) } initialOpen={true}>
          <SelectControl
              label="Column Size"
              help="Select Column Size"
              value={column}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
                { label: "11", value: "11" },
                { label: "12", value: "12" },
              ]}
              onChange={value => {
                setAttributes({ column: value });
              }}
            />
          </PanelBody>
          <PanelBody title={ __( 'Block settings' ) } initialOpen={true}>
          <SelectControl
              label="Column Breakpoint"
              help="Select Column Breakpoint"
              value={columnBP}
              options={[
                { label: "xs", value: "xs" },
                { label: "sm", value: "sm" },
                { label: "md", value: "md" },
                { label: "lg", value: "lg" },
                { label: "xl", value: "xl" },
              ]}
              onChange={value => {
                setAttributes({ columnBP: value });
              }}
            />
          </PanelBody>
          </InspectorControls>
        <InnerBlocks />
      </div>
    );
  },
  
save({ attributes }) {
  const { column, columnBP } = attributes;

  

  const cols = `col-${ columnBP }-${column}`;

  return (
    <div className={cols}>
      <InnerBlocks.Content />
    </div>
  );
},
} );