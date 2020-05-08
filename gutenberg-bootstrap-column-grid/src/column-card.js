import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  InnerBlocks,
	InspectorControls,
	MediaUpload,
  MediaPlaceholder,
  BlockControls,
  URLInputButton,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  Toolbar,
  IconButton,
} from '@wordpress/components';
import { withState } from '@wordpress/compose';

registerBlockType( 'create-block/column-card', {
	title: __( 'Bootstrap Card', 'create-block' ),
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
    cardType: {
      type: 'string',
      default: 'normal'
    },
    image: {
      type: 'object'
    },
    url: {
      type: 'string'
    },
  },

  parent: ["create-block/grid-container"],

	edit( { className, attributes, setAttributes } ) {

    const { column, cardType, columnBP, image, url } = attributes;

    const handleImage = image => {
      setAttributes({ image: image });
    };

    return (
      <div className={ className }>
      <InspectorControls>
          <PanelBody title={ __( 'Block settings' ) } initialOpen={true}>
          <SelectControl
              label="Card Type"
              help="Select Card Type"
              value={cardType}
              options={[
                { label: "Normal", value: "normal" },
                { label: "Overlay", value: "overlay" },
              ]}
              onChange={value => {
                setAttributes({ cardType: value });
              }}
            />
          </PanelBody>
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
          <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={handleImage}
            allowedTypes={['image']}
            render={({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={__('Edit media')}
                icon="edit"
                onClick={open}
              />
            )}
          />
          <URLInputButton
            url={ url }
            onChange={ ( url, post ) => setAttributes( { url, text: (post && post.title) || 'Click here' } ) }
          />
        </Toolbar>
      </BlockControls>
          {image && image.url ? (
            <MediaUpload
              onSelect={handleImage}
              value={image.url}
              render={({ open }) => (
                <div
                  className=""
                  onClick={open}
                >
                  <div
                    className=""
                  >
                  </div>

                  <img
                    className="card-img"
                    src={image.url}
                    alt={image.alt}
                  />
                </div>
              )}
            />
          ) : (
            <MediaPlaceholder onSelect={handleImage} />
          )}
        <InnerBlocks />
      </div>
    );
  },
  
save({ attributes }) {
  const { image, url, column, columnBP, cardType } = attributes;

  const imgClass = (cardType == 'normal') ? "card-img-top" : "card-img"; 
  const divClass = (cardType == 'normal') ? "card-body" : "card-img-overlay";

  const isEmpty = (url == undefined || url == '') ? true : false;
  

  const cols = `col-${ columnBP }-${column}`;

  return (
    <div className={cols}>
    <div className="card">
    <img
      className={imgClass}
      src={image.url}
      alt={image.alt}
    />
    <div className={divClass}>
      <InnerBlocks.Content />
    </div>
    </div>
    </div>
  );
},
} );