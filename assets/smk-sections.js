;(function () {
    if(window.frameElement) {
        parent.smarketly = {
            'id': 1,
            'token': '',
            'active': true,
            'serverUrl': 'https://apps.smarketly.com'
        };

        /*SMK.APP.VERSION=1.28*/
        parent.smarketly ={"id":239,"token":"","active":true,"version":1.28,"serverUrl":"https:\/\/apps.smarketly.com"}

        var sections = [
            'section-smk_product_blocks_top-smk_product_blocks_top',
            'section-smk_product_blocks_bottom-smk_product_blocks_bottom',
            'section-smk_product_blocks_footer-smk_product_blocks_footer',
            'section-smk_collection_blocks_top-smk_collection_blocks_top',
            'section-smk_collection_blocks_bottom-smk_collection_blocks_bottom',
            'section-smk_list_collections_blocks_top-smk_list_collections_blocks_top',
            'section-smk_list_collections_blocks_bottom-smk_list_collections_blocks_bottom',
            'section-smk_cart_blocks_top-smk_cart_blocks_top',
            'section-smk_cart_blocks_bottom-smk_cart_blocks_bottom',
            'section-smk_404_blocks_top-smk_404_blocks_top',
            'section-smk_404_blocks_bottom-smk_404_blocks_bottom',
            'section-smk_blocks_top-smk_blocks_top',
            'section-smk_blocks_bottom-smk_blocks_bottom',
            'section-smk_blocks_top_{{page}}-smk_blocks_top_{{page}}',
            'section-smk_blocks_bottom_{{page}}-smk_blocks_bottom_{{page}}',
            'section-smk_blocks_center_{{page}}-smk_blocks_center_{{page}}',
            'smk_blocks_index'
        ];

        var sectionKeys = {
            'section-smk_product_blocks_top-smk_product_blocks_top': 'smk_product_blocks_top',
            'section-smk_product_blocks_bottom-smk_product_blocks_bottom': 'smk_product_blocks_bottom',
            'section-smk_product_blocks_footer-smk_product_blocks_footer': 'smk_product_blocks_footer',
            'section-smk_collection_blocks_top-smk_collection_blocks_top': 'smk_collection_blocks_top',
            'section-smk_collection_blocks_bottom-smk_collection_blocks_bottom': 'smk_collection_blocks_bottom',
            'section-smk_list_collections_blocks_top-smk_list_collections_blocks_top': 'smk_list_collections_blocks_top',
            'section-smk_list_collections_blocks_bottom-smk_list_collections_blocks_bottom': 'smk_list_collections_blocks_bottom',
            'section-smk_cart_blocks_top-smk_cart_blocks_top': 'smk_cart_blocks_top',
            'section-smk_cart_blocks_bottom-smk_cart_blocks_bottom': 'smk_cart_blocks_bottom',
            'section-smk_404_blocks_top-smk_404_blocks_top': 'smk_404_blocks_top',
            'section-smk_404_blocks_bottom-smk_404_blocks_bottom': 'smk_404_blocks_bottom',
            'section-smk_blocks_top-smk_blocks_top': 'smk_blocks_top',
            'section-smk_blocks_bottom-smk_blocks_bottom': 'smk_blocks_bottom',
            'smk_blocks_index': 'smk_blocks_index'
        };

        sectionKeys = addDynamicSectionObject('section-smk_blocks_top_{{page}}-smk_blocks_top_{{page}}', 'smk_blocks_top_{{page}}', sectionKeys);
        sectionKeys = addDynamicSectionObject('section-smk_blocks_bottom_{{page}}-smk_blocks_bottom_{{page}}', 'smk_blocks_bottom_{{page}}', sectionKeys);
        sectionKeys = addDynamicSectionObject('section-smk_blocks_center_{{page}}-smk_blocks_center_{{page}}', 'smk_blocks_center_{{page}}', sectionKeys);

        var addToTitle = {
            'smk_product_blocks_top': 'Sections above buy box',
            'smk_product_blocks_bottom': 'Sections below buy box',
            'smk_product_blocks_footer': 'Sections above footer',
            'smk_collection_blocks_top': 'Sections above collection',
            'smk_collection_blocks_bottom': 'Sections below collection',
            'smk_list_collections_blocks_top': 'Sections above collections',
            'smk_list_collections_blocks_bottom': 'Sections below collections',
            'smk_cart_blocks_top': 'Sections above cart',
            'smk_cart_blocks_bottom': 'Sections below cart',
            'smk_404_blocks_top': 'Sections above content',
            'smk_404_blocks_bottom': 'Sections below content',
            'smk_blocks_top': 'Sections above content',
            'smk_blocks_bottom': 'Sections below content',
            'smk_blocks_index': 'Smarketly sections'
        };

        addToTitle = addDynamicSectionObject('smk_blocks_top_{{page}}', 'Sections above content', addToTitle);
        addToTitle = addDynamicSectionObject('smk_blocks_bottom_{{page}}', 'Sections below content', addToTitle);
        addToTitle = addDynamicSectionObject('smk_blocks_center_{{page}}', 'Smarketly sections', addToTitle);

        var newBlocks = [];

        /*SMARKETLY.newBlocks*/

        var $live = $(parent.document.getElementsByClassName("theme-editor__add-section")),
            $added = $(parent.document.getElementsByClassName("theme-editor__index")),
            icon_youtube = false,
            image_class = 'section-image',
            youtube_class = 'section-youtube',
            delay_time = 1500,
            start_delay_time = 4000;

        $added.find(".youtubebutton").length && $added.find(".youtubebutton").remove();

        var add_image = function(this_obj_type, $append_this, json_obj) {
            if($append_this.find('.' + image_class).length) return false;
            else if(!json_obj['images'].hasOwnProperty(this_obj_type)) return false;

            var image_append = '<img src="' + json_obj['defaulturl'] + json_obj['images'][this_obj_type] + '" alt="">',
                $image_append = $(image_append)
                    .css({
                        width: '100%',
                        marginTop: 10
                    })
                    .addClass(image_class);

            $append_this.append($image_append);
        };

        var set_images = function(json_obj) {
            $live.each(function() {
                var $this = $(this),
                    this_obj = $this.data('new-section'),
                    this_obj_type,
                    $this_button;

                if(!this_obj.type) return;
                else this_obj_type = this_obj.type;

                $this_button = $this.find('button').first();

                var set_youtube_btn = function() {
                    if(youtube_obj.youtube.hasOwnProperty(this_obj_type) && !$this_button.find('.' + youtube_class).length) {
                        $icon_youtube = $('<a href="' + youtube_obj['youtube'][this_obj_type] + '">' + icon_youtube + '</a>').css({
                            display: 'inline-block',
                            float: 'right',
                            width: 24,
                            height: 'auto'
                        })
                            .addClass(youtube_class);

                        $this_button.append($icon_youtube);
                    }
                }

                add_image(this_obj_type, $this_button, json_obj);

                $this_button.css({ paddingRight: 20 });

                $this_button.parent().find('.theme-editor__add-section-btn').on('click', function() {
                    setTimeout(addImagesInAddedWidgets.bind(this, json_obj), delay_time);
                });

                if($(parent.document.getElementsByClassName('theme-editor__subheading')).length) {
                    $(parent.document.getElementsByClassName('theme-editor__subheading')).css({"font-weight": "900", "font-size":"18px", "color":"#585858"});
                    $(parent.document.getElementsByClassName('theme-editor__add-section-item')).each(function(){
                        $(this).find("img").length && $(this).css({"text-decoration":"underline","font-weight":"600"});
                    });
                }
            });
        };

        function addImagesInAddedWidgets(json_obj) {
            if($(parent.document.getElementsByClassName('btn-destroy')).length) {
                var $btn_destroy = $(parent.document.getElementsByClassName('btn-destroy'));
                $btn_destroy.unbind().on('click', function() { setTimeout(addImagesInAddedWidgets.bind(this, json_obj), delay_time); });
            }

            var $ul = $(parent.document.getElementsByClassName("theme-editor__card"));
            var $ul_ = false;
            $ul.each(function(){
                if($(this).is('[data-content-for-index]')) $ul_ = $(this);
            });
            $ul = $ul_;

            var	$li = $ul.find("li");

            if($li.length === 1) return false;

            $li.each(function() {
                var $this = $(this),
                    title = $this.data('bind-attribute'),
                    $append_this = $this.find('> a');

                if(!title) return;

                title = title.split(',');

                title = parseTitle(title[1]);

                $append_this.unbind().on('click', function(){
                    setTimeout(function(){setYoutube(json_obj, title)}, 200);
                });

                setYoutube(json_obj, title)
            });
        };

        function setYoutube(json_obj, title){
            var value = json_obj['youtube'][title];
            if(value === undefined) return false;
            if(!$(parent.document.getElementsByClassName("te-panel--is-active"))) return false;
            var $openedtab = $(parent.document.getElementsByClassName("te-panel--is-active"));
            if(String($openedtab.attr("id")).indexOf("-"+title+"-") == -1) return false;
            var $h2 = $openedtab.find("h2").first();
            if($h2.find("img").length == 0) {
                $h2.append(icon_youtube);
                $h2.find("img").attr("data-link", value).click(function(){window.open($(this).attr('data-link'), '_blank');});
            }
        }

        function parseTitle(title) {
            var new_title = '',
                i = 0;

            for(; i < title.length; i++) {
                if(title.charAt(i) === '\'' || title.charAt(i) === '\)' || title.charAt(i) === '\}' || title.charAt(i) ===  '\"' || title.charAt(i) ===  ' ') continue;
                new_title += title.charAt(i);
            }

            return new_title;
        }

        /*$( document ).ready(function(){

         $.ajax({
         url: adminlinks,
         success: function(data){
         initExtarnalData();
         },
         error: function(jqXHR, textStatus, errorThrown){
         console.log(jqXHR);
         console.log(textStatus);
         console.log(errorThrown);

         setTimeout(
         function(){
         $added
         .find('[data-section-id=show-helper]')
         .find('.stacked-menu__item-text')
         .html('Update Help Information.<br><span style="color:black;">General Settings > Settings:<br>HELPER > Click Update information<br><br>In opened window copy<br>new link and paste<br>in the field \"Link\" in theme.<\/span>')
         .css('color', 'red')
         .parent()
         .find('.stacked-menu__item-icon')
         .remove();
         }, start_delay_time);

         }
         });
         });*/

        /*function initExtarnalData(){
         addScript(adminlinks);
         function addScript( src ) {
         var s = document.createElement( 'script' );
         s.setAttribute( 'src', src );
         s.onload=ready;
         document.body.appendChild( s );
         }
         function ready(){
         console.log(json.version);
         icon_youtube = json.icon_youtube;
         set_images(json);
         setTimeout(function(){addImagesInAddedWidgets(json);}, start_delay_time);
         }
         }*/




        $( document ).ready(function(){
            setTimeout(function(){
                var $live = $(parent.document.getElementById("section-show-helper-show-helper"));
                var d = $live.find('.next-card__section');
                if(d.length){
                    if(d.find('.adminpanelcl').length) return false;
                    $.ajax({
                        url: '//softali.net/shopify/wo_ap/adminpanel.html',
                        context: document.body,
                        success: function(data){
                            d.append(data);
                        }
                    });
                }
            }, 3000);
        });

        verifyAppStatus();

        function verifyAppStatus() {
            if (parent.smarketly.id != undefined && parent.smarketly.id != 1) {
                $.get( parent.smarketly.serverUrl + '/verify/' + parent.smarketly.id, function( data ) {
                    console.log('verify', data);
                    if (data != undefined && typeof data == 'object' && data.active === false) {
                        parent.smarketly.active = false;

                        sections.forEach(function(sectionId) {
                            if (parent.smarketly.active === false) {
                                sectionId = fillSectionKey(sectionId);
                                hideSection(sectionId);
                            }
                        });
                    }
                    if (data != undefined && typeof data == 'object' && data.active === true
                        && parent.smarketly.version != undefined && parent.smarketly.version && data.version != parent.smarketly.version) {
                        var themeId = null;
                        if (window.Shopify != undefined && window.Shopify.theme && window.Shopify.theme.id) {
                            themeId = window.Shopify.theme.id;
                        }
                        if (!themeId) {
                            //do additional check
                        }
                        if (themeId) {
                            //add loader
                            var loaderStyles = '<style>.smk-update-loader,.smk-update-loader:after {border-radius: 50%;width: 10em;height: 10em;}.smk-update-loader {font-size: 2px;position: relative;text-indent: -9999em;border-top: 1.1em solid rgba(255, 255, 255, 0.2);border-right: 1.1em solid rgba(255, 255, 255, 0.2);border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);border-left: 1.1em solid #3f4eae;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: load8 1.1s infinite linear;animation: load8 1.1s infinite linear;}@-webkit-keyframes load8 {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes load8 {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(360deg);transform: rotate(360deg);}}</style>';
                            var updateMessage = loaderStyles + '<div class="smk-version-message" style="margin-left: 20px;margin-right: -220px; display:flex; font-size: 12px; line-height: 13px; align-items: center;">' +
                                '<div>Smarketly Page Builder Editor<br>Outdated version detected.<br>Updating your theme...</div>' +
                                '<div class="smk-update-loader" style="margin-left: 20px;"></div>' +
                                '</div>';
                            var topBar = $('section[component="UI.Preview"] header.te-context-bar .te-preview-context-bar__inner .te-top-bar__item.te-top-bar__item--fill.te-top-bar__item--bleed', window.parent.document);
                            if (!$(topBar).find('.smk-version-message').length) {
                                $(topBar).prepend(updateMessage);
                            }
                            $.get( parent.smarketly.serverUrl + '/update/assets/' + parent.smarketly.id + '/event/update/theme/' + themeId, function( themeUpdateResponse ) {
                                //finish loader and reload page
                                //wait so user can see the success message before reloading
                                $(topBar).find('.smk-version-message').html('Theme update complete.<br>Reloading editor.');
                                setTimeout(function() {
                                    parent.location.reload(false);
                                }, 1000);
                            });
                        }
                    }
                });
            }
            return false;
        }

        function fillSectionKey(sectionKey)
        {
            var hash = parent.location.hash;
            if (hash && hash.includes('#/pages/') && sectionKey.includes('{{page}}')) {
                sectionKey = sectionKey.split('{{page}}').join(hash.replace('#/pages/', ''));
            }
            return sectionKey;
        }

        function addDynamicSectionObject(key, value, object)
        {
            var hash = parent.location.hash;
            if (hash && hash.includes('#/pages/')) {
                object[key.split('{{page}}').join(hash.replace('#/pages/', ''))] = value.split('{{page}}').join(hash.replace('#/pages/', ''));
            }
            return object;
        }

        function hideSection(sectionId) {
            var fixedSections = sectionKeys;
            if (fixedSections[sectionId]) {
                var $live = $(parent.document.getElementById(sectionId));
                var section = {};
                if ($live.length && $live.data('panel-id')) {
                    section = $('[data-fixed-section-id="' + $live.data('panel-id') + '"]', parent.document);
                }
                if (sectionId == 'smk_blocks_index') {
                    $live = $(parent.document.querySelector('[data-section-type="' + sectionId + '"]'));
                    if ($live.length && $live.data('section-id')) {
                        section = $('[data-section-id="' + $live.data('section-id') + '"]', parent.document);
                    }
                    $('h3.ui-subheading.ui-subheading--subdued.theme-editor__subheading:contains("Smarketly")').hide();
                    $('section.next-card.theme-editor__card ul li button:contains("Smarketly")').closest('section').hide();
                }

                $('.smk-content').hide();
                if (section.length) {
                    $(section).hide();
                }

            }
        }

        function enhanceSectionName(sectionId)
        {
            var fixedSections = sectionKeys;

            if (fixedSections[sectionId]) {

                var bySmarketly = '<div class="bySmarketly" style="color: #ccc; font-size: 12px; line-height: 12px; font-weight: 400;">by Smarketly</div>';
                var li = $('ul.theme-editor-action-list li[data-section-id="' + fixedSections[sectionId] + '"]', parent.document);
                var header = $('.te-panel[data-panel-id="' + fixedSections[sectionId] + '"] header.te-panel__header .ui-heading.theme-editor__heading', parent.document);

                if (sectionId == 'smk_blocks_index') {
                    li = $('li[title="Smarketly sections"]', parent.document);

                }

                li.each(function(index, item) {
                    if (addToTitle[fixedSections[sectionId]] && $(item).length && $(item).attr('title') && !$(item).find('bySmarketly').length) {
                        $(item).attr('title', addToTitle[fixedSections[sectionId]]);
                        $(item).find('.ui-stack-item.stacked-menu__item-text[data-section-name="true"]').html(
                            addToTitle[fixedSections[sectionId]] + bySmarketly
                        );
                        $(item).attr('data-smk-title-changed', true);

                        if (sectionId == 'smk_blocks_index' && $(item).length && $(item).attr('data-section-id')) {
                            header = $('.te-panel[data-panel-id="' + $(item).attr('data-section-id') + '"] header.te-panel__header .ui-heading.theme-editor__heading', parent.document);
                        }

                        if (addToTitle[fixedSections[sectionId]] && header.length && !header.attr('data-smk-header-changed')) {
                            header.css('padding-top', '8px');
                            header.html(addToTitle[fixedSections[sectionId]] + bySmarketly);
                            header.attr('data-smk-header-change', true);
                        }
                    }
                });





            }
        }

        sections.forEach(function(sectionId) {
            sectionId = fillSectionKey(sectionId);
            setInterval(function() {
                if (parent.smarketly.active === false) {
                    hideSection(sectionId);
                } else {
                    enhanceSectionName(sectionId);
                }
            }, 200);
        });

        //BEGIN----------------------------- ADDING "ADD CONTENT" BUTTON TO FREE BLOCKS -----------------------------

        parent.smkAddPopoverSection = smkAddPopoverSection;
        parent.smkAddBlock = smkAddBlock;
        parent.smkClosePopover = smkClosePopover;
        parent.smkGoToUpgrade = smkGoToUpgrade;

        var sectionTypes = [
            'smk_product_blocks_top',
            'smk_product_blocks_bottom',
            'smk_product_blocks_footer',
            'smk_collection_blocks_top',
            'smk_collection_blocks_bottom',
            'smk_list_collections_blocks_top',
            'smk_list_collections_blocks_bottom',
            'smk_cart_blocks_top',
            'smk_cart_blocks_bottom',
            'smk_404_blocks_top',
            'smk_404_blocks_bottom',
            'smk_blocks_top',
            'smk_blocks_bottom',
            'smk_blocks_top_{{page}}',
            'smk_blocks_bottom_{{page}}',
            'smk_blocks_center_{{page}}',
            'smk_blocks_index'
        ];

        var blocks = {
            'smk_text_plus_image': {
                'name': 'Text Plus Image',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_text_plus_image.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_text_plus_image.png',
                'type': 'free'
            },
            'smk_big_banners': {
                'name': 'Big Banners',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_big_banners.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_big_banners.png',
                'type': 'pro'
            },
            'smk_icon_banners': {
                'name': 'Icon Banners',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_icon_banners.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_icon_banners.png',
                'type': 'pro'
            },
            'smk_custom_html': {
                'name': 'Custom Html',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_custom_html.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_custom_html.png',
                'type': 'pro'
            },
            'smk_instagram': {
                'name': 'Instagram',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_instagram.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_instagram.png',
                'type': 'pro'
            },
            'smk_blog_posts': {
                'name': 'Blog Posts',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_blog_posts.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_blog_posts.png',
                'type': 'pro'
            },
            'smk_text_block': {
                'name': 'Text Block',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_text_block.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_text_block.png',
                'type': 'pro'
            },
            'smk_promo_collections': {
                'name': 'Promo Collections',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_promo_collections.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_promo_collections.png',
                'type': 'pro'
            },
            'smk_brands_slider': {
                'name': 'Brands Slider',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_brands_slider.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_brands_slider.png',
                'type': 'pro'
            },
            'smk_faq': {
                'name': 'FAQ',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_faq_new.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_faq_new.png',
                'type': 'pro'
            },
            'smk_testimonials': {
                'name': 'Testimonials',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_testimonials_new.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_testimonials_new.png',
                'type': 'pro'
            },
            'smk_video_banner': {
                'name': 'Video Banner',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_video_banner_new.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_video_banner_new.png',
                'type': 'pro'
            },
            'smk_columns_products': {
                'name': 'Columns Products',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_columns_products_new.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_columns_products_new.png',
                'type': 'pro'
            },
            'smk_revolution_slider': {
                'name': 'Revolution Slider',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_revolution_slider.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_revolution_slider.png',
                'type': 'pro'
            },
            /*'smk_revolution_banner': {
                'name': 'Revolution Banner',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_columns_products_new.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_columns_products_new.png',
                'type': 'pro'
            },*/
            'smk_column_banners': {
                'name': 'Column Banners',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_column_banners.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_column_banners.png',
                'type': 'pro'
            },
            'smk_article_block': {
                'name': 'Article Block',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_article_block.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_article_block.png',
                'type': 'pro'
            },
            /*'smk_navigation_banners': {
                'name': 'Navigation Banners',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_column_banners.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_column_banners.png',
                'type': 'pro'
            },
            'smk_collection_tabs': {
                'name': 'Collection Tabs',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_column_banners.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_column_banners.png',
                'type': 'pro'
            },*/
            'smk_icon_features_bar': {
                'name': 'Icon Features Bar',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_icon_features_bar.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_icon_features_bar.png',
                'type': 'pro'
            },
            'smk_creative_banners': {
                'name': 'Creative Banners',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_creative_banners.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_creative_banners.png',
                'type': 'pro'
            },
            'smk_product_offers': {
                'name': 'Product Offers',
                'image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_product_offers.png',
                'locked': 'https://apps.smarketly.com/assets/block-thumbnails/locked/smk_product_offers.png',
                'type': 'pro'
            },
        };

        sectionTypes.forEach(function(sectionType) {
            sectionType = fillSectionKey(sectionType);
            setInterval(function() {
                smkAddContentButton(sectionType);
                smkInsertLimitHeader(sectionType, 'to publish more than 1 section', false);
            }, 200);
        });

        function smkAddContentButton(sectionType) {
            var li = $(parent.document.querySelector('.te-panel.te-panel--is-visible.te-panel--is-active[component="UI.SectionPanel"] li[data-section-type="' + sectionType + '"][component="UI.BlockPicker"]'));

            if ($(li).length
                && !$(li).closest('ul').find('[data-smk-show-popover="' + sectionType + '"]').length
                && !$(li).find('.ui-popover__container').length) {
                //console.log('popover button add to: ', sectionType);
                $(li).after(smkCreateAddContentButton($(li).data('section-id'), sectionType));
                $(li).hide();
            }
        }

        function smkInsertLimitHeader(sectionType, text, force) {
            var header = '<div class="smk-limit-header" style="font-size: 10px;line-height: 20px;margin-top: 9px;">' +
                '<div class="ui-button ui-button--primary ui-button--size-small theme-editor__add-section-btn" ' +
                'onclick="smkGoToUpgrade()" ' +
                'style="position: relative; margin-bottom: 12px;margin-right: -1px;margin-left: 9px;padding: 6px;font-size: 12px;background: linear-gradient(to bottom, #ffaa4e, #da8437);border-color: #d38e2d;box-shadow: inset 0 1px 0 0 #fca75a;">' +
                'Upgrade' +
                '</div>' +
                ' ' + text
                '</div>';
            var li = $(parent.document.querySelector('.te-panel.te-panel--is-visible.te-panel--is-active[component="UI.SectionPanel"] li[data-section-type="' + sectionType + '"][component="UI.BlockPicker"]'));
            if ($(li).closest('.te-panel').find('.te-panel__body>h3.ui-subheading:contains("Content")')
                && (force || !$(li).find('.ui-popover__container').length)
                && !$(li).closest('.te-panel').find('.te-panel__body>h3.ui-subheading:contains("Content")').find('.smk-limit-header').length) {
                $(li).closest('.te-panel').find('.te-panel__body>h3.ui-subheading:contains("Content")').html('Content' + header);
            }
        }

        function smkCreateAddContentButton(sectionId, sectionType)
        {
            var button = '<li onclick="smkAddPopoverSection(\'' + sectionType + '\', this)" data-section-id="' + sectionId + '" data-smk-show-popover="' + sectionType + '" title="Sections above cart">' +
                '<button class="ui-button ui-button--full-width theme-editor-action-list__item theme-editor-action-list__item--link" type="button" name="button"> ' +
                '<div class="ui-stack ui-stack--alignment-center ui-stack--spacing-none"> ' +
                '<div class="ui-stack-item stacked-menu__item-disclosure-icon"> ' +
                '<svg class="next-icon next-icon--color-slate-lighter next-icon--size-20 next-icon--rotate-270" style="visibility: hidden" aria-hidden="true" focusable="false"> <use xlink:href="#next-disclosure"></use> </svg> ' +
                '</div>    ' +
                '<div class="ui-stack-item stacked-menu__item-icon"> ' +
                '<div class="theme-editor__icon"> ' +
                '<svg aria-hidden="true" focusable="false" class="next-icon next-icon--color-blue-light next-icon--size-24"> <use xlink:href="#add-block"></use> </svg> ' +
                '</div> ' +
                '</div>    <div class="ui-stack-item ui-stack-item--fill" data-bind-show="canAddBlock()">' +
                'Add content ' +
                '</div>   ' +
                '</div>' +
                '</button> ' +
                '</li>';
            return button;
        }

        function smkAddPopoverSection(sectionType, button)
        {
            var popoverBlocks = '';
            var sectionId = sectionType;
            if ($(button).data('section-id')) {
                sectionId = $(button).data('section-id');
            }

            for (const block in blocks) {
                if (blocks.hasOwnProperty(block)) {
                    var popoverButtonText = 'Add';
                    var popoverBlockImage = blocks[block].image;
                    var popoverButtonStyles = 'top:1px;right:20px;';
                    var popoverTitleStyles = 'text-decoration: underline; font-weight: 600;';
                    var popoverImageStyles = 'margin-top:10px; margin-bottom: 40px;';
                    var popoverButtonClick = 'smkAddBlock(\'' + sectionId + '\', \'' + sectionType + '\')';
                    if (blocks[block].type == 'pro') {
                        popoverButtonText = 'Upgrade to Add';
                        popoverBlockImage = blocks[block].locked;
                        popoverButtonStyles += 'padding: 6px; font-size: 12px; line-height:12px; background: linear-gradient(to bottom, #ffaa4e, #da8437); border-color: #d38e2d; box-shadow: inset 0 1px 0 0 #fca75a';
                        popoverTitleStyles += 'opacity:0.8;';
                        popoverImageStyles += 'opacity:0.3;';
                        popoverButtonClick = 'smkGoToUpgrade()';
                    }
                    popoverBlocks += '' +
                        '<li onclick=" ' + popoverButtonClick + ' "> ' +
                        '<button class="ui-button ui-button--full-width theme-editor-action-list__item" type="button" name="button">' +
                        '<span  style="' + popoverTitleStyles + '">' + blocks[block].name + '</span>' +
                        '<div class="ui-button ui-button--primary ui-button--size-small theme-editor__add-section-btn" style="' + popoverButtonStyles + '">' +
                        popoverButtonText +
                        '</div>' +
                        '<img src="' + popoverBlockImage + '" class="section-image" style="' + popoverImageStyles + '">' +
                        '</button> ' +
                        '</li> ';
                }
            }

            var popoverTitle = 'Smarketly sections<div style="color: #ccc; font-size: 12px; line-height: 12px; font-weight: 400;">by Smarketly</div>';

            if ($(button).closest('.te-panel').find('.te-panel__header .ui-heading.theme-editor__heading').length) {
                popoverTitle = $(button).closest('.te-panel').find('.te-panel__header .ui-heading.theme-editor__heading').html();
            }

            var popover = '<div class="smk-popover ui-popover ui-popover--full-width ui-popover--is-positioned-beneath ui-popover--is-active" data-popover-relative-to-closest=".te-panel__body" data-popover-scroll-container=".te-panel__body" style="position: fixed; height: calc(100vh - 112px); top: -8px; margin-right: 0px; margin-left: 0px; transform-origin: 50% center; z-index: 3;" data-popover-css-vertical-margin="8" data-popover-css-horizontal-margin="0" data-popover-css-max-height="1" data-popover-css-max-width="10000" id="ui-popover--27" aria-labelledby="ui-popover-activator--27" aria-expanded="true" role="dialog">' +
                '<div class="ui-popover-add-section">' +
                '<header class="te-panel__header"> ' +
                '<h2 class="ui-heading theme-editor__heading" style="padding-top: 8px;">' + popoverTitle + '</h2> ' +
                '<div class="ui-button btn--plain te-panel__header-action te-panel__header-action--subdued" aria-label="Close panel" type="button" name="button" style="padding: 18px 10px;" onclick="smkClosePopover()">' +
                '<svg aria-hidden="true" focusable="false" class="next-icon next-icon--size-16"> <use xlink:href="#next-remove"></use> </svg><span class="helper--visually-hidden"> Cancel adding section </span>' +
                '</div>' +
                '</header>' +
                '</div>' +
                '<div class="ui-popover__content-wrapper" style="max-height: 100%;">' +
                '<div class="ui-popover__content" style="max-height: 100%;">' +
                '<div class="ui-popover__pane scroll-shadow--bottom"> ' +
                '<ul class="theme-editor-action-list theme-editor-action-list--compact"> ' +
                popoverBlocks +
                '</ul> ' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';



            //$(button).find('button').after(popover);
            smkClosePopover();
            $(button).after(popover);

        }

        function smkAddBlock(sectionId, sectionType) {
            smkClosePopover();
            var li = $(parent.document.querySelector('li[data-section-id="' + sectionId + '"][data-section-type="' + sectionType + '"][component="UI.BlockPicker"]'));
            $(li).find('button').click();
        }

        function smkClosePopover()
        {
            //console.log('close popover called');
            $('.smk-popover', window.parent.document).remove();
        }

        function smkGoToUpgrade()
        {
            var userId = 11;
            if (parent.smarketly.id) {
                userId = parent.smarketly.id;
            }
            var url = parent.smarketly.serverUrl + '/upgrade/productBlocks/user/' + userId;
            var win = window.open(url, '_blank');
            win.focus();
        }

        //END----------------------------- ADDING "ADD CONTENT" BUTTON TO FREE BLOCKS -----------------------------
        //BEGIN---------------------------- ADDING "ADD SMARKETLY SECTIONS" BUTTON TO PAGES -----------------------------


        parent.smkAddSectionsOnPage = smkAddSectionsOnPage;
        function smkInsertAddOnPageButton()
        {
            var button = '<div class="type--centered smk-add-on-page-btn" style="margin-top: 10px;"> ' +
                '<a onclick="smkAddSectionsOnPage(this)" class="ui-button" type="button" name="button">' +
                'Add Smarketly Sections ' +
                '<svg aria-hidden="true" focusable="false" class="next-icon next-icon--size-12"> <use xlink:href="#next-website"></use> </svg> ' +
                '</a>' +
                '<div class="smk-adding-sections" style="color: #818181; display: none;">' +
                'Adding Smarketly sections...<br>' +
                'Editor will be restarted.</div> ' +
                '</div>';

            var hash = parent.location.hash;
            var sectionList = $('[component="UI.SectionList"]', window.parent.document);
            if (parent.smarketly.active !== false
                && hash.includes('/pages/')
                && ($(sectionList).find('[data-fixed-section-id]').length || $(sectionList).find('.theme-editor__empty-state'))
                && !$(sectionList).find('[data-section-id="smk_blocks_top_' + hash.replace('#/pages/', '') + '"]').length
                && !$(sectionList).find('[data-section-id="smk_blocks_center_' + hash.replace('#/pages/', '') + '"]').length
            ) {
                if (!$('.smk-add-on-page-btn', window.parent.document).length) {
                    $(sectionList).append(button);
                    $('.smk-add-on-page-btn', window.parent.document).show();
                }
            }
        }

        function smkAddSectionsOnPage(button)
        {
            var hash = parent.location.hash;
            var page = hash.replace('#/pages/', '');
            if (parent.smarketly.id != undefined && parent.smarketly.id != 1 && page) {
                $(button).hide();
                $(button).parent().find('.smk-adding-sections').show();
                $.get( parent.smarketly.serverUrl + '/update/assets/' + parent.smarketly.id + '/pages/' + page, function( data ) {
                    console.log('start install pages', data);
                    if (data != undefined && typeof data == 'object' && data.result === 'success') {
                        $(button).parent().find('.smk-adding-sections').html('Smarketly sections added.<br>Restarting editor...');
                        $('.smk-add-on-page-btn', window.parent.document).remove();
                        console.log('install finished');
                        console.log(data);
                        parent.location.reload(false);
                    } else {
                        $(button).show();
                    }
                });
            }
            return false;
        }

        setTimeout(function() {
            $('.smk-add-on-page-btn', window.parent.document).hide();
            setInterval(function() {
                smkInsertAddOnPageButton();
            }, 200);
        }, 0);


        //END---------------------------- ADDING "ADD SMARKETLY SECTIONS" BUTTON TO PAGES -----------------------------

        //$(function() {

            setTimeout(function(){
                sections.forEach(function(sectionId) {
                    sectionId = fillSectionKey(sectionId);
                    setInterval(function() {
                        smkAddImagesToBlocks(sectionId);
                        /*if (parent.smarketly.active === false) {
                            hideSection(sectionId);
                        }*/
                    }, 400);
                });

            }, 1000);

            function smkAddImagesToBlocks(sectionId) {
                var $live = $(parent.document.getElementById(sectionId));
                if (sectionId == 'smk_blocks_index') {
                    $live = $(parent.document.querySelectorAll('[data-section-type="' + sectionId + '"]'));
                }
                /*var d = $live.find('.next-card__section');
                if(d.length){
                    if(!d.find('.adminpaneltest').length) {
                        //d.append('<div class="adminpaneltest"><img src="https://static.smarketly.co/assets/images/uploads/D7PDjsGQq8xdkGm.png"></div>');
                    }

                }*/

                var blockImages = {
                    'Text Plus Image': 'https://apps.smarketly.com/assets/block-thumbnails/smk_text_plus_image.png',
                    'Big Banners': 'https://apps.smarketly.com/assets/block-thumbnails/smk_big_banners.png',
                    'Icon Banners': 'https://apps.smarketly.com/assets/block-thumbnails/smk_icon_banners.png',
                    'Custom Html': 'https://apps.smarketly.com/assets/block-thumbnails/smk_custom_html.png',
                    'Instagram': 'https://apps.smarketly.com/assets/block-thumbnails/smk_instagram.png',
                    'Blog Posts': 'https://apps.smarketly.com/assets/block-thumbnails/smk_blog_posts.png',
                    'Text Block': 'https://apps.smarketly.com/assets/block-thumbnails/smk_text_block.png',
                    'Brands Slider': 'https://apps.smarketly.com/assets/block-thumbnails/smk_brands_slider.png',
                    'Promo Collections': 'https://apps.smarketly.com/assets/block-thumbnails/smk_promo_collections.png',
                    'FAQ': 'https://apps.smarketly.com/assets/block-thumbnails/smk_faq_new.png',
                    'Testimonials': 'https://apps.smarketly.com/assets/block-thumbnails/smk_testimonials_new.png',
                    'Video Banner': 'https://apps.smarketly.com/assets/block-thumbnails/smk_video_banner_new.png',
                    'Columns Products': 'https://apps.smarketly.com/assets/block-thumbnails/smk_columns_products_new.png',
                    'Revolution Slider': 'https://apps.smarketly.com/assets/block-thumbnails/smk_revolution_slider.png',
                    //'Revolution Banner': 'https://apps.smarketly.com/assets/block-thumbnails/smk_columns_products_new.png',
                    'Column Banners': 'https://apps.smarketly.com/assets/block-thumbnails/smk_column_banners.png',
                    'Article Block': 'https://apps.smarketly.com/assets/block-thumbnails/smk_article_block.png',
                    //'Navigation Banners': 'https://apps.smarketly.com/assets/block-thumbnails/smk_columns_products_new.png',
                    //'Collection Tabs': 'https://apps.smarketly.com/assets/block-thumbnails/smk_columns_products_new.png',
                    'Icon Features Bar': 'https://apps.smarketly.com/assets/block-thumbnails/smk_icon_features_bar.png',
                    'Creative Banners': 'https://apps.smarketly.com/assets/block-thumbnails/smk_creative_banners.png',
                    'Product Offers': 'https://apps.smarketly.com/assets/block-thumbnails/smk_product_offers.png',
                };


                $live.each(function(index, live) {
                    var ui = $(live).find('.ui-popover ul.theme-editor-action-list li button');

                    var popover = $(live).find('.ui-popover.ui-popover--full-width');
                    if (popover.length) {
                        var addSection = '<div class="ui-popover-add-section"><header class="te-panel__header"> ' +
                            '<h2 class="ui-heading theme-editor__heading">Add section</h2> ' +
                            '<div class="ui-button btn--plain te-panel__header-action te-panel__header-action--subdued" aria-label="Close panel" type="button" name="button" style="padding: 18px 10px;">' +
                            '<svg aria-hidden="true" focusable="false" class="next-icon next-icon--size-16"> <use xlink:href="#next-remove"></use> </svg>' +
                            '<span class="helper--visually-hidden"> Cancel adding section </span>' +
                            '</div>' +
                            '</header></div>';
                        if(!popover.find('.ui-popover-add-section').length) {
                            popover.find('.ui-popover__content-wrapper').before(addSection);
                        }
                        popover.find('.ui-popover__content-wrapper').css('max-height', '100%');
                        popover.find('.ui-popover__content').css('max-height', '100%');
                        popover.css({
                            'position': 'fixed',
                            'height': 'calc(100vh - 112px)',
                            'top': '-8px'
                        });
                    }
                    var addedImages = [];
                    if(ui.length) {
                        ui.each(function() {
                            if($( this ).find('.section-image').length) return false;
                            var blockName = $( this ).html();
                            if (blockImages[blockName] !== undefined) {
                                addedImages.push(blockName);
                                $( this ).append('<div class="ui-button ui-button--primary ui-button--size-small theme-editor__add-section-btn" style="top:1px;right:20px">Add</div>');
                                //if (blockName != 'Custom Html') {
                                $( this ).append('<img src="' + blockImages[blockName] + '" class="section-image" style="margin-top:10px; margin-bottom: 40px;">');
                                if (newBlocks[blockName]) {

                                }
                                //}
                                ui.css({
                                    'text-decoration': 'underline',
                                    'font-weight': 600
                                })
                            }
                        });

                    }

                    if (addedImages.length && addedImages.length < Object.keys(blockImages).length) {
                        var popoverBlocks = '';
                        for (const block in blocks) {
                            if (blocks.hasOwnProperty(block) && !addedImages.includes(blocks[block].name)) {
                                var popoverButtonText = 'Upgrade to Add';
                                var popoverBlockImage = blocks[block].locked;
                                var popoverButtonStyles = 'top:1px;right:20px;padding: 6px; font-size: 12px; line-height:12px; background: linear-gradient(to bottom, #ffaa4e, #da8437); border-color: #d38e2d; box-shadow: inset 0 1px 0 0 #fca75a';
                                var popoverTitleStyles = 'text-decoration: underline; font-weight: 600;opacity:0.8;';
                                var popoverImageStyles = 'margin-top:10px; margin-bottom: 40px;opacity:1;';
                                var popoverButtonClick = 'smkGoToUpgrade()';
                                popoverBlocks += '' +
                                    '<li class="smk-pro-block-link" onclick=" ' + popoverButtonClick + ' "> ' +
                                    '<button class="ui-button ui-button--full-width theme-editor-action-list__item" type="button" name="button">' +
                                    '<span  style="' + popoverTitleStyles + '">' + blocks[block].name + '</span>' +
                                    '<div class="ui-button ui-button--primary ui-button--size-small theme-editor__add-section-btn" style="' + popoverButtonStyles + '">' +
                                    popoverButtonText +
                                    '</div>' +
                                    '<img src="' + popoverBlockImage + '" class="section-image" style="' + popoverImageStyles + '">' +
                                    '</button> ' +
                                    '</li> ';
                            }
                        }
                        if (!popover.find('.theme-editor-action-list .smk-pro-block-link').length && popoverBlocks) {
                            popover.find('.theme-editor-action-list').append(popoverBlocks);
                            /*sectionTypes.forEach(function(sectionType) {
                                sectionType = fillSectionKey(sectionType);
                                setInterval(function() {
                                    smkInsertLimitHeader(sectionType, 'to add more sections', true);
                                }, 200);
                            });*/
                        }
                    }
                });

            }

            //BEGIN---------------------------- ADDING TIER 1 EYE ICONS -----------------------------

            parent.smkAddShowHideSection = smkAddShowHideSection;

            sectionTypes.forEach(function(sectionType) {
                sectionType = fillSectionKey(sectionType);
                setInterval(function() {
                    smkAddShowHideSection(sectionType, 'add');
                }, 450);
            });

            function smkAddShowHideSection(sectionType, action, event)
            {
                event = event || window.event;
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                //console.log('smkAddShowHideSection-init');
                var section = $('[component="UI.SectionList"]>ul[data-fixed-section-id="' + sectionType + '"]>li[data-section-id="' + sectionType + '"]', window.parent.document);
                if (section.length) {
                    //console.log('smkAddShowHideSection-sectionFound');
                    var panel = $(section).closest('[component="UI.PanelContainer"]').find('.te-panel[component="UI.SectionPanel"][data-panel-id="' + sectionType + '"]');
                    if (panel.length) {
                        //console.log('smkAddShowHideSection-panelFound');
                        var checkbox = $(panel).find('section.next-card.theme-editor__card  .theme-setting.theme-setting--checkbox input[type="checkbox"]'); //[name="settings[sections][][settings][]"]');
                        if (checkbox.length && checkbox.attr('id') && checkbox.attr('id').includes('show')) {
                            if (action === 'click') {
                                //console.log('smkAddShowHideSection-checkboxClicked');
                                var label = checkbox.closest('label');
                                if (!label.length) {
                                    label = checkbox.closest('.next-input-wrapper').find('label');
                                }
                                label.click();
                            }

                            var iconClasses = 'smk-section-eye-button ui-button ui-button--transparent theme-editor__section-toggle-icon';
                            var enabled = true;
                            var title = 'Hide';
                            if (!checkbox.is(':checked')) {
                                enabled = false;
                                iconClasses += ' theme-editor__section-toggle-icon--disabled';
                                title = 'Show';
                            }

                            if (!$(section).find('.smk-section-eye-button[data-toggle-section-id="' + sectionType + '"]').length) { // && !link.hasClass('ui-stack-collapse-tier')) {=
                                var icon = '<button class="' + iconClasses + '"' +
                                    'type="button" name="button" title="' + title + '"' +
                                    'onclick="return smkAddShowHideSection(\'' + sectionType + '\', \'click\', event)"' +
                                    ' data-toggle-section-id="' + sectionType + '">' +
                                    '<span class="helper--visually-hidden" data-bind="">Show Smarketly sections</span>' +
                                    '</button>';
                                $(section).find('a.theme-editor-action-list__item>.ui-stack').append(icon);
                            } else {
                                $(section).find('.smk-section-eye-button[data-toggle-section-id="' + sectionType + '"]').attr('class', iconClasses).attr('title', title);
                            }
                            $(section).find('a.theme-editor-action-list__item').css('padding-right', '14px');
                            if (enabled) {
                                $(section).removeClass('theme-editor__section--disabled');
                            } else {
                                $(section).addClass('theme-editor__section--disabled');
                            }
                            checkbox.closest('.next-card.theme-editor__card').hide();
                            checkbox.closest('.te-panel__body.te-panel__wrapper').find('.ui-subheading:contains("Settings")').hide();
                            checkbox.closest('.te-panel__body.te-panel__wrapper').css('padding-top', '0');
                        }

                    }

                }
            }


            //END---------------------------- ADDING TIER 1 EYE ICONS -----------------------------
            //BEGIN---------------------------- ADDING TIER 2 EYE ICONS + TIER 3 COLLAPSE -----------------------------

            parent.addCollapseAndToggle = addCollapseAndToggle;

            if (!$('head', window.parent.document).html().includes('<!--smk-editor-extension-invoked-->')) {
                addCollapseAndToggle(true);
            } else {
                addCollapseAndToggle(false);
            }

            /*$(window).on('hashchange', function(){
                console.log('location changed!');
                addCollapseAndToggle(false);
            });*/

            function addCollapseAndToggle(initBase) {
                setTimeout(function() {
                    if (initBase) {
                        addShowHideIcons();
                        smkAddCollapseBlockTiers();
                    }

                    $('ul.theme-editor-action-list', window.parent.document).off('DOMNodeInserted').on('DOMNodeInserted', 'div.ui-stack-item.ui-stack-item--fill.stacked-menu__item-text', function(e) {
                        var item = $(this);
                        var accordionId = item.closest('li').data('accordion-id');
                        console.log('list.accordion.id', accordionId);
                        if (accordionId != undefined && typeof accordionId === 'string' && accordionId.includes('smk_')) {

                            smkAddCollapseBlockTiers();
                            smkShowHideBlock('add', item);
                        }
                    });

                    setInterval(function() {
                        $('div[component="UI.SectionList"] ul.theme-editor-action-list[data-content-for-index]>li', window.parent.document).each(function(index, section) {
                            if ($(section).attr('title') == 'Smarketly sections' && !$(section).attr('data-smk-dom-watcher')) {
                                console.log('section watcher:', section);
                                $(section).attr('data-smk-dom-watcher', true);
                                var sectionId = $(section).attr('data-section-id');
                                if (sectionId) {
                                    $('ul.theme-editor-action-list[data-section-id="' + sectionId + '"]', window.parent.document).off('DOMNodeInserted').on('DOMNodeInserted', 'div.ui-stack-item.ui-stack-item--fill.stacked-menu__item-text', function(e) {
                                        var item = $(this);
                                        var accordionId = item.closest('li').data('accordion-id');
                                        console.log('list.accordion.id', accordionId);
                                        if (accordionId != undefined && typeof accordionId === 'string' && accordionId.includes('smk_')) {

                                            smkAddCollapseBlockTiers();
                                            smkShowHideBlock('add', item);
                                        }
                                    });
                                }

                            }
                        });
                    }, 200);

                }, 1500);
            }

            function addShowHideIcons()
            {
                parent.smkShowHideBlock = smkShowHideBlock;
                var blocks = $('.ui-stack-item.stacked-menu__item-disclosure-icon', window.parent.document);
                if (blocks.length) {
                    blocks.each(function () {
                        if ( !$(this).hasClass('smk-tier-disclosure-icon') ) {
                            smkShowHideBlock('add', this);
                        }

                    });
                }

                /*$('.smk-eye-button', window.parent.document).off('click').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('original click');
                    smkShowHideBlock('click', this);
                });*/
                $('head', window.parent.document).append('<!--smk-editor-extension-invoked-->');
                $('head', window.parent.document).append('<style>' +
                    '.smk-eye-button.ui-button--transparent:active,' +
                    '.smk-eye-button.ui-button--transparent:focus,' +
                    '.smk-tier-eye-button.ui-button--transparent:active,' +
                    '.smk-tier-eye-button.ui-button--transparent:focus {' +
                        'background-color: transparent;' +
                    '}' +
                    '.smk-collapse-theme-section.theme-editor__section .theme-editor-action-list__item {' +
                        'background: #ffffff;' +
                        'color: #212b36;' +
                    '}' +
                    '.smk-collapse-theme-section.theme-editor__section--disabled .theme-editor-action-list__item {' +
                        'background: #f9fafb;' +
                        'color: #798c9c;' +
                    '}' +
                    '.smk-collapse-theme-section.theme-editor__section .theme-editor__icon>.next-icon, .theme-editor__section--disabled .theme-editor__icon>.next-icon__text {' +
                        'fill: #212b36;' +
                    '}' +
                    '.smk-collapse-theme-section.theme-editor__section--disabled .theme-editor__icon>.next-icon, .theme-editor__section--disabled .theme-editor__icon>.next-icon__text {' +
                        'fill: #798c9c;' +
                    '}' +
                    '</style>');

            }

            function smkShowHideBlock(action, item, event)
            {
                event = event || window.event;
                if (event != undefined) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                var currentItem = $(this);
                if (item !== undefined) {
                    currentItem = $(item);
                }
                var link = currentItem.closest('.ui-stack');
                var li = link.closest('li');
                if (li.length) {
                    var blockId = li.data('block-id');
                    if (blockId != undefined) {
                        var panel = li.closest('.te-panel');
                        var sectionId = panel.data('panel-id');
                        var accordionId = panel.data('accordion-id');
                        var homepage = false;
                        if (accordionId != undefined && typeof accordionId === 'string' && accordionId.includes('smk_')) {
                            homepage = true;
                        }
                        if ((sectionId != undefined && typeof sectionId === 'string' && sectionId.includes('smk_')) || homepage) {
                            var checkbox = li.find('input[name="settings[sections][' + sectionId + '][blocks][' + blockId + '][settings][show_section]"]');
                            if (checkbox.length) {
                                if (action == 'click') {
                                    //var checkboxLabel = checkbox.closest('label[for="' + checkbox.attr('id') + '"]');
                                    //checkbox.parent().click();
                                    var label = checkbox.closest('label');
                                    if (!label.length) {
                                        label = checkbox.closest('.next-input-wrapper').find('label');
                                    }
                                    label.click();

                                    //checkbox.click();
                                }

                                var iconClasses = 'smk-eye-button ui-button ui-button--transparent theme-editor__section-toggle-icon';
                                var enabled = true;
                                var title = 'Hide';
                                if (!checkbox.is(':checked')) {
                                    enabled = false;
                                    iconClasses += ' theme-editor__section-toggle-icon--disabled';
                                    title = 'Show';
                                } else {
                                    smkHideOtherBlocks(1, item);
                                }
                                if (!link.find('.smk-eye-button').length && !link.hasClass('ui-stack-collapse-tier')) {
                                    var icon = '<button class="' + iconClasses + '"' +
                                        'type="button" name="button" title="' + title + '"' +
                                        'onclick="return smkShowHideBlock(\'click\', this, event)"' +
                                        ' data-toggle-section-id="' + sectionId + '" data-toggle-block-id="' + blockId + '">' +
                                        '<span class="helper--visually-hidden" data-bind="">Show Smarketly sections</span>' +
                                        '</button>';
                                    link.append(icon);
                                } else {
                                    link.find('.smk-eye-button').attr('class', iconClasses).attr('title', title);
                                }
                                if (enabled) {
                                    li.removeClass('theme-editor__section--disabled');
                                } else {
                                    li.addClass('theme-editor__section--disabled');
                                }
                                checkbox.closest('.theme-setting.theme-setting--checkbox').hide();

                            }
                        }
                    }

                }
                return false;
            }

            function smkHideOtherBlocks(count, item)
            {
                if (!$(item).closest('.te-panel[component="UI.SectionPanel"]').find('li[component="UI.BlockPicker"] .ui-popover__container').length) {
                    $(item).closest('.te-panel[component="UI.SectionPanel"] ul[component="BlockList"]').find('li[component="UI.BlockCard"]').each(function(index, block) {
                        if (!$(block).hasClass('theme-editor__section--disabled') && $(item).closest('li[component="UI.BlockCard"]').attr('context') != $(block).attr('context')) {
                            smkShowHideBlock('click', $(block).find('a.theme-editor-action-list__item .smk-eye-button'));
                        }
                    });
                }

            }

            function smkAddCollapseBlockTiers() {
                if (parent) {
                    parent.smkToggleBlockTier = smkToggleBlockTier;
                    parent.smkShowHideTier = smkShowHideTier;
                }


                var blocks = $('.ui-accordion.theme-editor__block-accordion', window.parent.document);

                if (blocks.length) {
                    blocks.each(function () {
                        smkCollapseBlockTiers('add', this);
                    });
                }

                /*setTimeout(function() {
                    $('.smk-tier-eye-button', window.parent.document).off('click').on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var tier = $(this).data('eye-tier-id');
                        var blockId = $(this).data('eye-block-id');
                        console.log(tier, blockId);
                        if (tier !== undefined && blockId !== undefined) {
                            console.log('here');
                            smkShowHideTier(tier, blockId, this);
                        }
                    });
                }, 300);*/
            }


            function smkCollapseBlockTiers(event, item)
            {
                if ($(item).find('.collapse-block').length) {
                    return false;
                }
                var blockId = $(item).attr('id');
                if (blockId != undefined && typeof blockId === 'string' && blockId.includes('smk_')) {
                    var blockItems = $(item).find('div.ui-accordion__panel').children();
                    var tierIndex = 0;
                    blockItems.each(function () {
                        var blockItem = $(this);
                        if (blockItem.length) {
                            if (blockItem.hasClass('theme-setting--header')) {
                                var header = blockItem.find('h3.ui-subheading');
                                if (header.length) {
                                    var headerContents = header.html();
                                    if (headerContents != undefined
                                        && typeof headerContents === 'string'
                                        && (headerContents.toLowerCase().includes('banner')
                                            || headerContents.toLowerCase().includes('collection')
                                            || headerContents.toLowerCase().includes('image')
                                            || headerContents.toLowerCase().includes('question')
                                            || headerContents.toLowerCase().includes('review')
                                            || headerContents.toLowerCase().includes('column')
                                            || headerContents.toLowerCase().includes('slide')
                                            || headerContents.toLowerCase().includes('tab')
                                            || headerContents.toLowerCase().includes('line')
                                            || headerContents.toLowerCase().includes('product')
                                        )
                                        && hasNumber(headerContents)
                                    ) {
                                        //var header = $(this).parent();
                                        tierIndex++;
                                        var collapse = '<div class="smk-collapse-theme-section theme-editor__section" style="width: calc(100% + 40px); margin-left: -20px; border-bottom: 1px solid #ccc;">' +
                                            '<a href="#" class="theme-editor-action-list__item" data-smk-tier-toggle-link="tier-'+ tierIndex +'-' + blockId + '" onclick="smkToggleBlockTier(\'tier-'+ tierIndex +'\', \'' + blockId + '\', this)"> ' +
                                            '<div class="ui-stack ui-stack-collapse-tier ui-stack--alignment-center ui-stack--spacing-none"> ' +
                                            '<div class="ui-stack-item smk-tier-disclosure-icon stacked-menu__item-disclosure-icon next-icon--rotate-270"> ' +
                                            '   <svg class="next-icon next-icon--color-slate-lighter next-icon--size-20" aria-hidden="true" focusable="false"> <use xlink:href="#next-disclosure"></use> </svg> ' +
                                            '</div>' +
                                            '<div class="ui-stack-item stacked-menu__item-icon" data-block-icon="true" data-bind-unsafe-html="editor.blockIcon(blockId)">' +
                                            '   <div class="theme-editor__icon"> ' +
                                            '       <svg class="next-icon next-icon--color-slate-lighter te-icon--two-tone"><use xlink:href="#block"></use></svg> ' +
                                            '   </div>' +
                                            '</div> ' +
                                            '<div class="ui-stack-item ui-stack-item--fill stacked-menu__item-text" data-block-name="true" data-bind="editor.blockName(blockId)">' + headerContents + '</div>' +
                                            '<button class="smk-tier-eye-button ui-button ui-button--transparent theme-editor__section-toggle-icon"' +
                                            'data-eye-tier-id="tier-'+ tierIndex +'" data-eye-block-id="' + blockId + '"' +
                                            'onclick="return smkShowHideTier(\'tier-'+ tierIndex +'\', \'' + blockId + '\', this, event)"' +
                                            'type="button" name="button" title="Hide"><span class="helper--visually-hidden" data-bind="">Show Smarketly sections</span></button></div>' +
                                            '</a>'+
                                            '</div>';
                                        var additionalCollapseMarkup = '';
                                        var additionalCollapseStyle = 'display: block;';
                                        if (tierIndex > 1) {
                                            additionalCollapseMarkup += ' class="collapse-block" data-collapse-tier="tier-'  + (tierIndex - 1) + '" data-collapse-block-id="' + blockId + '"';
                                            additionalCollapseStyle = 'display: none;';
                                        }
                                        if (tierIndex > 0) {
                                            blockItem.before('<div style="margin-top: 20px; height:1px; width: calc(100% + 40px); margin-left: -20px; border-bottom: 1px solid #ccc; ' + additionalCollapseStyle + ' " ' + additionalCollapseMarkup + '></div>');
                                        }
                                        blockItem.before(collapse);
                                    }
                                }
                            }
                            if (tierIndex > 0) {
                                if (blockItem.prop("tagName").toLowerCase() !== 'footer') {
                                    blockItem.addClass('collapse-block');
                                    blockItem.attr('data-collapse-tier', 'tier-'  + tierIndex);
                                    blockItem.attr('data-collapse-block-id', blockId);
                                    blockItem.hide();
                                } else {
                                    blockItem.css('margin-top', '20px');
                                }

                                var checkbox = blockItem.find('input[type="checkbox"]');
                                if (checkbox.length
                                    && checkbox.attr('id') != undefined
                                    && typeof checkbox.attr('id') === 'string'
                                    && (checkbox.attr('id').endsWith(tierIndex + '_show') || checkbox.attr('id').endsWith(tierIndex + '_show_banner'))
                                ) {
                                    checkbox.attr('data-show-tier-id', blockId + '_tier-' + tierIndex);
                                    checkbox.closest('.theme-setting.theme-setting--checkbox').removeClass('collapse-block').hide();
                                    if (!checkbox.is(':checked')) {
                                        var currentEye = $(item).find('.smk-tier-eye-button[data-eye-tier-id="tier-' + tierIndex + '"][data-eye-block-id="' + blockId + '"]');
                                        if (currentEye.length) {
                                            currentEye.addClass('theme-editor__section-toggle-icon--disabled');
                                            currentEye.attr('title', 'Show');
                                            currentEye.closest('.smk-collapse-theme-section').addClass('theme-editor__section--disabled');
                                        }
                                    }
                                }

                            }
                        }
                    });


                }
            }

            function smkToggleBlockTier(tier, blockId, button) {
                var tierItems = {};
                var parentBlock = $(button).closest('.ui-accordion__panel');
                if (parentBlock.length) {
                    tierItems = parentBlock.find('.collapse-block[data-collapse-tier="' + tier + '"][data-collapse-block-id="' + blockId + '"]');
                } else {
                    tierItems = $('.collapse-block[data-collapse-tier="' + tier + '"][data-collapse-block-id="' + blockId + '"]', window.parent.document);
                }
                var rotateClass = 'next-icon--rotate-270';
                var iconSelector = '.stacked-menu__item-disclosure-icon';
                if (tierItems.length) {
                    //hasClass returns false for no reason, className is returning undefined, did fix via attr
                    if ( $(button).find(iconSelector).attr('class') && $(button).find(iconSelector).attr('class').includes(rotateClass) ) {
                        try {
                            $(tierItems).show();
                            $(button).find(iconSelector).removeClass(rotateClass);
                        } catch (c) {
                            try { $(tierItems).css('display', 'block'); } catch (c) {}
                            try { Util.removeClass(button.querySelector(iconSelector), rotateClass); } catch (c) {}
                            try { Util.removeClass(parent.document.querySelector('[data-smk-tier-toggle-link="'+ tier + '-' + blockId +'"]' + iconSelector), rotateClass); } catch (c) {}
                            try { $(button).find(iconSelector).attr('class', $(button).find(iconSelector).attr('class').replace(' ' + rotateClass, '')); } catch (c) {}
                        }
                    } else {
                        try {
                            $(tierItems).hide();
                            $(button).find(iconSelector).addClass(rotateClass);
                        } catch (c) {
                            try { $(tierItems).css('display', 'block'); } catch (c) {}
                            try { Util.addClass(button.querySelector(iconSelector), rotateClass); } catch (c) {}
                            try { Util.addClass(parent.document.querySelector('[data-smk-tier-toggle-link="'+ tier + '-' + blockId +'"]' + iconSelector), rotateClass); } catch (c) {}
                            try { $(button).find(iconSelector).attr('class', $(button).find(iconSelector).attr('class') + (' ' + rotateClass)); } catch (c) {}
                        }
                    }
                }
            }

            function smkShowHideTier(tier, blockId, button, event) {
                event = event || window.event;
                if (event != undefined) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                console.log('start');
                var disabledClass = 'theme-editor__section-toggle-icon--disabled';
                var parentBlock = $(button).closest('ui-accordion__panel');
                var checkbox = {};
                if (parentBlock.length) {
                    checkbox = parentBlock.find('input[data-show-tier-id="' + blockId + '_' + tier + '"]');
                } else {
                    try { checkbox = $('input[data-show-tier-id="' + blockId + '_' + tier + '"]', window.parent.document); } catch (c) {}
                    try { checkbox = $('input[data-show-tier-id="' + blockId + '_' + tier + '"]', parent.document); } catch (c) {}
                }

                console.log('tier-checkbox', checkbox);
                if ($(button).hasClass(disabledClass)) {
                    if (checkbox.length) {
                        $(button).removeClass(disabledClass);
                        checkbox.closest('.next-input-wrapper').find('label[for="' + checkbox.attr('id') + '"]').click();
                        $(button).closest('.smk-collapse-theme-section').removeClass('theme-editor__section--disabled');
                    }
                } else {
                    if (checkbox.length) {
                        $(button).addClass(disabledClass);
                        checkbox.closest('.next-input-wrapper').find('label[for="' + checkbox.attr('id') + '"]').click();
                        $(button).closest('.smk-collapse-theme-section').addClass('theme-editor__section--disabled');
                    }
                }
            }

            function hasNumber(string) {
                return /\d/.test(string);
            }
        //})(jQuery);
    }
}());


/* Section */


$.fn.smk_big_banners = function(){
    smkResizeBackground();
    $(window).resize(function() {
        smkResizeBackground();
    });
    $(window).load(function() {
        smkResizeBackground();
    });

    function smkResizeBackground() {
        var b = $('[data-smk-section-type="smk_big_banners"] .smk-big-banners-parallax');
        $(b).css("background-size", $(b).width() + 'px');
    }
};

$.fn.smk_instagram = function(){
    var m = this.find('[data-username]');
    /*if (!(typeof $.instagramFeed === 'function')) {
     m.replaceWith('<span class="text-center" style="display: inherit;">Save and reload page.</span>');
     return false;
     }*/

    var a = m.attr('id');
    var username = m.data('username');
    var hashtag = m.data('hashtag');
    var count = m.data('count');

    if(username == '' && hashtag == '') return false;
    console.log('here');
    new InstagramFeed({
        'tag': hashtag,
        'username': username,
        'container': document.getElementById(a),
        'display_profile': false,
        'display_biography': false,
        'display_gallery': true,
        'styling': false,
        'items': count,
        'margin': 0
    });
};

$.fn.smkInitSlick = function(md, sm, xs) {
    this.smkSlick({
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        responsive:
            [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: md,
                        slidesToScroll: md
                    }
                },
                {
                    breakpoint: 791,
                    settings: {
                        slidesToShow: sm,
                        slidesToScroll: sm
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: xs,
                        slidesToScroll: xs
                    }
                }
            ]
    });
};

$.fn.smkInitSlickBrands = function(md, sm, sm2, xs, xs2) {
    this.smkSlick({
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: md,
                    slidesToScroll: md
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: sm,
                    slidesToScroll: sm
                }
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: sm2,
                    slidesToScroll: sm2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: xs,
                    slidesToScroll: xs
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: xs2,
                    slidesToScroll: xs2
                }
            }
        ]
    });
};

$.fn.smk_faq = function(){
    // FAQ Template - by CodyHouse.co
    var FaqTemplate = function(element) {
        this.element = element;
        this.sections = this.element.getElementsByClassName('cd-faq__group');
        this.triggers = this.element.getElementsByClassName('cd-faq__trigger');
        this.faqContainer = this.element.getElementsByClassName('cd-faq__items')[0];
        this.faqsCategoriesContainer = this.element.getElementsByClassName('cd-faq__categories')[0];
        this.faqsCategories = this.faqsCategoriesContainer.getElementsByClassName('cd-faq__category');
        this.faqOverlay = this.element.getElementsByClassName('cd-faq__overlay')[0];
        this.faqClose = this.element.getElementsByClassName('cd-faq__close-panel')[0];
        this.scrolling = false;
        console.log('faq section init');
        initFaqEvents(this);
    };

    function initFaqEvents(faqs) {
        // click on a faq category
        faqs.faqsCategoriesContainer.addEventListener('click', function(event){
            var category = event.target.closest('.cd-faq__category');
            if(!category) return;
            var mq = getMq(faqs),
                selectedCategory = category.getAttribute('href').replace('#', '');
            if(mq == 'mobile') { // on mobile, open faq panel
                event.preventDefault();
                faqs.faqContainer.scrollTop = 0;
                Util.addClass(faqs.faqContainer, 'cd-faq__items--slide-in');
                Util.addClass(faqs.faqClose, 'cd-faq__close-panel--move-left');
                Util.addClass(faqs.faqOverlay, 'cd-faq__overlay--is-visible');
                var selectedSection = faqs.faqContainer.getElementsByClassName('cd-faq__group--selected');
                if(selectedSection.length > 0) {
                    Util.removeClass(selectedSection[0], 'cd-faq__group--selected');
                }
                Util.addClass(document.getElementById(selectedCategory), 'cd-faq__group--selected');
            } else { // on desktop, scroll to section
                if(!window.requestAnimationFrame) return;
                event.preventDefault();
                var windowScrollTop = window.scrollY || document.documentElement.scrollTop;
                Util.scrollTo(document.getElementById(selectedCategory).getBoundingClientRect().top + windowScrollTop + 2, 200);
            }
        });

        // on mobile -> close faq panel
        faqs.faqOverlay.addEventListener('click', function(event){
            closeFaqPanel(faqs);
        });
        faqs.faqClose.addEventListener('click', function(event){
            event.preventDefault();
            closeFaqPanel(faqs);
        });

        // on desktop -> toggle faq content visibility when clicking on the trigger element
        faqs.faqContainer.addEventListener('click', function(event){
            //if(getMq(faqs) != 'desktop') return;
            var trigger = event.target.closest('.cd-faq__trigger');
            if(!trigger) return;
            event.preventDefault();
            var content = trigger.nextElementSibling,
                parent = trigger.closest('li'),
                bool = Util.hasClass(parent, 'cd-faq__item-visible');


            /*if (Util.hasClass(faqs.sections, 'cd-faq-show-one')) {
                $(faqs.sections).find('.cd-faq__item-visible').removeClass('cd-faq__item-visible');
            }*/

            Util.toggleClass(parent, 'cd-faq__item-visible', !bool);

            //store initial and final height - animate faq content height
            Util.addClass(content, 'cd-faq__content--visible');
            var initHeight = bool ? content.offsetHeight: 0,
                finalHeight = bool ? 0 : content.offsetHeight;

            if(window.requestAnimationFrame) {
                Util.setHeight(initHeight, finalHeight, content, 200, function(){
                    heighAnimationCb(content, bool);
                });
            } else {
                heighAnimationCb(content, bool);
            }
        });

        if(window.requestAnimationFrame) {
            // on scroll -> update selected category
            /*window.addEventListener('scroll', function(){
                if(getMq(faqs) != 'desktop' || faqs.scrolling) return;
                faqs.scrolling = true;
                window.requestAnimationFrame(updateCategory.bind(faqs));
            });*/
        }
    };

    function closeFaqPanel(faqs) {
        Util.removeClass(faqs.faqContainer, 'cd-faq__items--slide-in');
        Util.removeClass(faqs.faqClose, 'cd-faq__close-panel--move-left');
        Util.removeClass(faqs.faqOverlay, 'cd-faq__overlay--is-visible');
    };

    function getMq(faqs) {
        //get MQ value ('desktop' or 'mobile')
        return window.getComputedStyle(faqs.element, '::before').getPropertyValue('content').replace(/'|"/g, "");
    };

    function updateCategory() { // update selected category -> show green rectangle to the left of the category
        var selected = false;
        for(var i = 0; i < this.sections.length; i++) {
            var top = this.sections[i].getBoundingClientRect().top,
                bool = (top <= 0) && (-1*top < this.sections[i].offsetHeight);
            Util.toggleClass(this.faqsCategories[i], 'cd-faq__category-selected', bool);
            if(bool) selected = true;
        }
        if(!selected) Util.addClass(this.faqsCategories[0], 'cd-faq__category-selected');
        this.scrolling = false;
    };

    function heighAnimationCb(content, bool) {
        content.removeAttribute("style");
        if(bool) Util.removeClass(content, 'cd-faq__content--visible');
    };

    var faqTemplate = document.getElementsByClassName('js-cd-faq'),
        faqArray = [];
    if(faqTemplate.length > 0) {
        for(var i = 0; i < faqTemplate.length; i++) {
            faqArray.push(new FaqTemplate(faqTemplate[i]));
        }
    };
};


$.fn.smkInitRevolution = function(){

    /*if($('body').find('.revolution_included').length == 0)
    {
        this.replaceWith('<span class="text-center" style="display: inherit;">Save and reload page.</span>');
        return false;
    }*/

    function click_to_play_video() {
        var $this = $(this),
            $video = $this.find('li video');

        if (!$video.length) return;

        $video.on('play', function() {
            var $btn = $(this).parents('li').find('.video-play');

            $btn.addClass('pause');
            $(this).parents('.tp-caption.fullscreenvideo').addClass('click-video');
        });

        $video.on('pause ended', function() {
            var $btn = $(this).parents('li').find('.video-play');

            $btn.removeClass('pause');
        });

        $this.find('.video-play').on('click', function(e) {
            var $video = $(this).parents('li').find('video');

            $video.trigger('click');
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        $this.on('revolution.slide.onbeforeswap', function(event, data) {
            $(this).find('.tp-caption.fullscreenvideo').removeClass('click-video');
        });
    };

    function autoplay_video(elem) {
        var $get_sliders = $(this);

        $get_sliders.each(function() {
            var $slider = $(this);

            var set_event = function() {
                $slider.on('revolution.slide.onchange', function(event, data) {
                    var $this = $(this),
                        $active_slide = $this.find('li').eq(data.slideIndex - 1),
                        $video = $active_slide.find('video'),
                        autoplay = $active_slide.find('.tp-caption').attr('data-autoplay');

                    if ($video.length && autoplay === 'true') {
                        var video = $video.get(0);

                        video.currentTime = 0;

                        $slider.one('revolution.slide.onafterswap', function(event, data) {
                            if (video.paused) {
                                video.play();
                            }
                        });
                    }
                });
            };

            if ($slider.hasClass('revslider-initialised')) {
                set_event();
            } else {
                $slider.one('revolution.slide.onloaded', function() {
                    set_event();
                });
            }
        });
    };

    $.fn.resizeRevolution = function(options, new_rev_obj, bp_arr, revdelay) {
        if (!$(this).length || !$(options.slider).length || !options.breakpoints) return false;

        var wrapper = this,
            slider = options.slider,
            breakpoints = options.breakpoints,
            fullscreen_BP = options.fullscreen_BP || false,
            new_rev_obj = new_rev_obj || {},
            bp_arr = bp_arr || [],
            rev_obj = {
                dottedOverlay: "none",
                delay: revdelay,
                startwidth: 1920,
                hideThumbs: 200,
                hideTimerBar: "on",

                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,

                navigationArrows: "true",

                touchenabled: "on",
                onHoverStop: "on",

                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,

                parallax: "mouse",
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                keyboardNavigation: "off",

                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,

                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,

                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,

                shadow: 0,

                spinner: "",
                h_align: "left",

                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,

                shuffle: "off",

                autoHeight: "off",
                forceFullWidth: "off",

                hideThumbsOnMobile: "off",
                hideNavDelayOnMobile: 1500,
                hideBulletsOnMobile: "off",
                hideArrowsOnMobile: "off",
                hideThumbsUnderResolution: 0,

                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
                fullScreenOffsetContainer: ""
            };

        $.extend(rev_obj, new_rev_obj);

        var get_Slider = function($sliderWrapp) {
            return $sliderWrapp.find(slider);
        };

        var get_current_bp = function() {
            var wind_W = window.innerWidth;

            for (var i = 0; i < breakpoints.length; i++) {
                var bp = breakpoints[i];

                if (!breakpoints.length) return false;

                if (wind_W <= bp) {
                    if (i === 0) {
                        return bp;
                    } else {
                        if (bp > breakpoints[i - 1])
                            return bp;
                    }
                } else if (wind_W > bp && i === breakpoints.length - 1)
                    return Infinity;
            }
            return false;
        };

        var $sliderWrappers = $(wrapper);

        $sliderWrappers.each(function() {
            var $sliderWrapp = $(this),
                $sliderInit = get_Slider($sliderWrapp),
                $sliderCopy = $sliderWrapp.clone(),
                bp = get_current_bp();

            if (!$sliderInit.length) return false;

            var start_Rev = function($sliderInit, bp) {
                var wind_W = window.innerWidth,
                    rev_settings_obj = {},
                    rev_screen_obj = {},
                    set_rev_obj = {};

                if (fullscreen_BP) {
                    var full_width = (wind_W >= fullscreen_BP) ? 'off' : 'on',
                        full_screen = (wind_W >= fullscreen_BP) ? 'on' : 'off';

                    rev_screen_obj = {
                        fullWidth: full_width,
                        fullScreen: full_screen
                    };
                }

                if (bp_arr.length) {
                    for (var i = 0; i < bp_arr.length; i++) {
                        var this_obj = bp_arr[i];

                        if (this_obj.bp && this_obj.bp.length === 2 && this_obj.bp[0] < this_obj.bp[1]) {
                            var from = this_obj.bp[0],
                                to = this_obj.bp[1];

                            if (from <= bp && to >= bp) {
                                for (var key in this_obj) {
                                    if (key !== 'bp')
                                        rev_settings_obj[key] = this_obj[key];
                                }
                            }
                        }
                    }
                }

                $.extend(set_rev_obj, rev_obj, rev_settings_obj, rev_screen_obj);

                $($sliderInit).show().revolution(set_rev_obj);

                $(options.functions).each(function() {
                    this.call($sliderInit);
                });
            };

            start_Rev($sliderInit, bp);

            var restart_Rev = function(current_bp) {
                if (!$($sliderInit).hasClass('revslider-initialised')) return;
                bp = current_bp || 0;
                $sliderInit.revkill();
                $sliderWrapp.replaceWith($sliderCopy);
                $sliderWrapp = $sliderCopy;
                $sliderCopy = $sliderWrapp.clone();
                $sliderInit = get_Slider($sliderWrapp);
                start_Rev($sliderInit, bp);
            };

            function endResize(func) {
                var windWidth = window.innerWidth,
                    interval;

                interval = setInterval(function() {
                    var windWidthInterval = window.innerWidth;
                    if (windWidth === windWidthInterval) {
                        setTimeout(function() {
                            func();
                        }, 200);
                    }
                    clearInterval(interval);
                }, 100);
            };

            $(window).on('resize', function() {
                endResize(function() {
                    var current_bp = get_current_bp();
                    if (current_bp !== bp)
                        restart_Rev(current_bp);
                })
            });
        });
    };

    var delay = this.data('speed'),
        fullscreen = this.attr('data-fullscreen') == 'false' ? false : 768,
        width = this.attr('data-width'),
        height = this.attr('data-height');

    if(this.hasClass('revolution-default')) {
        this.resizeRevolution(
            {
                slider: '.tp-banner',
                breakpoints: [414, 767, 1025],
                fullscreen_BP: fullscreen,
                functions: [
                    click_to_play_video,
                    autoplay_video
                ]
            },
            {
                fullScreenOffsetContainer: "header",
                navigationArrows: "true",
                startwidth: width || 1920,
                startheight: height || 800
            },
            [
                {
                    bp: [0, 768],
                    startheight: height || 1200
                }
            ],
            delay
        );
    }
    else {
        this.resizeRevolution(
            {
                slider: '.tp-banner',
                breakpoints: [414, 767, 1025],
                fullscreen_BP: fullscreen,
                functions: [
                    click_to_play_video,
                    autoplay_video
                ]
            },
            {
                fullScreenOffsetContainer: "header-static",
                startwidth: width || 1920,
                startheight: height || 800
            },
            [
                {
                    bp: [0, 768],
                    startheight: height || 1200
                },
                {
                    bp: [0, 1025],
                    fullScreenOffsetContainer: "header"
                }
            ],
            delay
        );
    }
};

$.fn.smkInitSingleTextWithIcon = function() {
    var $singleTextWithIcons = this;
    singleTextWithIconHandler();
    $(window).resize(singleTextWithIconHandler);
    function singleTextWithIconHandler(){
        //console.log($(window).width());
        $(window).width() > 1024 ? unslickSingleTextWithIcon() : initSlickSingleTextWithIcon();
    }

    function initSlickSingleTextWithIcon(){
        if($singleTextWithIcons.hasClass('slick-slider')) return false;
        $singleTextWithIcons.smkSlick({
            dots: false,
            arrows: false,
            infinite: true,
            adaptiveHeight: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive:
                [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
        });
    }
    function unslickSingleTextWithIcon(){

        if(!$singleTextWithIcons.hasClass('slick-slider')) return false;
        setTimeout(function(){$singleTextWithIcons.smkSlick('unslick');}, 200);

    }
};

$.fn.smk_product_offers = function() {
    $('.smk-product-offer-btn').on('click', function(event) {
        var target = $( event.target );
        var behaviour = $(target).attr('data-behaviour');
        var variant = $(target).attr('data-variant-id');
        var url = $(target).attr('data-url');
        var product = $(target).attr('data-product-url');
        var quantity = 1;
        if ($(target).attr('data-quantity')) {
            quantity = $(target).attr('data-quantity');
        }
        var discount = $(target).attr('data-discount-code');
        var discountBehaviour = $(target).attr('data-discount-behaviour');
        var discountApplied = false;
        var timeout = 0;
        if (behaviour) {
            discountApplied = smkApplyDiscount(discount, discountBehaviour);
            if (discountApplied) {
                timeout = 500;
            }
            setTimeout(function () {
                switch (behaviour) {
                    case 'product_page':
                        console.log('CLICK: Product page');
                        if (product) {
                            window.location.href = product;
                        } else {
                            window.location.reload(false);
                        }
                        break;
                    case 'add_to_cart':
                        console.log('CLICK: Add to cart');
                        if (quantity && variant) {
                            console.log('prod:info', quantity, variant);
                            $.post('/cart/add.js', {
                                items: [{ quantity: parseInt(quantity), id: variant }]
                            }).always(function() {
                                console.log('added');
                                window.location.reload(false);
                                return false;
                            });
                        }
                        break;
                    case 'add_to_cart_cart':
                        console.log('CLICK: Add to cart cart');
                        if (quantity && variant) {
                            console.log('prod:info', quantity, variant);
                            $.post('/cart/add.js', {
                                items: [{ quantity: parseInt(quantity), id: variant }]
                            }).always(function() {
                                console.log('added');
                                window.location.href = '/cart';
                                return false;
                            });
                        }
                        break;
                    case 'url':
                        console.log('CLICK: Url');
                        if (url) {
                            window.location.href = url;
                        } else {
                            window.location.reload(false);
                        }
                        break;
                    case 'add_to_cart_url':
                        console.log('CLICK: Add to cart url');
                        if (quantity && variant) {
                            console.log('prod:info', quantity, variant);
                            $.post('/cart/add.js', {
                                items: [{ quantity: parseInt(quantity), id: variant }]
                            }).always(function() {
                                console.log('added');
                                if (url) {
                                    window.location.href = url;
                                } else {
                                    window.location.reload(false);
                                }
                                return false;
                            });
                        }
                        break;
                    case 'add_to_cart_checkout':
                        console.log('CLICK: Add to cart checkout');
                        if (quantity && variant) {
                            console.log('prod:info', quantity, variant);
                            $.post('/cart/add.js', {
                                items: [{ quantity: parseInt(quantity), id: variant }]
                            }).always(function() {
                                console.log('added');
                                window.location.href = '/checkout';
                                return false;
                            });
                        }
                        break;
                    default:
                }
            }, timeout);
        }
    });

    function smkApplyDiscount(discount, discountBehaviour)
    {
        var applied = false;
        if (discount && discountBehaviour && discountBehaviour == 'auto_apply') {
            console.log('apply discount', discount);
            $.get('/discount/' + discount).always(function() {
                console.log('discount applied', discount);
            });
            applied = true;
        }
        return applied;
    }

};


$.fn.smkInitSection = function(){
    var _ = this;
    var n = _.data('smk-section-type');
    switch (n) {
        case ("smk_big_banners"): _.smk_big_banners(); break;
        case ("smk_instagram"): _.smk_instagram(); break;
        case ("smk_brands_slider"): _.find('.smk-carousel-brands').smkInitSlickBrands(6, 4, 3, 2, 1); break;
        case ("smk_testimonials"): _.find('.smk-slider-fullwidth').smkInitSlick(1, 1, 1); break;
        case ("smk_faq"): _.smk_faq(); break;
        case ("smk_revolution_slider"):  _.find('.smk-revolution-slider').smkInitRevolution(); break;
        case ("smk_icon_features_bar"): _.find('.smk-single-text-with-icons').smkInitSingleTextWithIcon(); break;
        case ("smk_product_offers"): _.smk_product_offers(); break;
        default: break;
    }
};

$(document)
    .on('shopify:section:load', eventHandler)
    .ready(function() {
        $('[data-smk-section-type]').each(function(){ $(this).smkInitSection() });
    });

function eventHandler(e) {
    $('#' + e.target.id).find('[data-smk-section-type]').each(function(){ $(this).smkInitSection() });
}
















// Utility function
function Util () {};

/*
 class manipulation functions
 */
Util.hasClass = function(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.add(classList[0]);
    else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.remove(classList[0]);
    else if(Util.hasClass(el, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
    }
    if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
    if(bool) Util.addClass(el, className);
    else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

/*
 DOM manipulation
 */
Util.getChildrenByClassName = function(el, className) {
    var children = el.children,
        childrenByClass = [];
    for (var i = 0; i < el.children.length; i++) {
        if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
    }
    return childrenByClass;
};

/*
 Animate height of an element
 */
Util.setHeight = function(start, to, element, duration, cb) {
    var change = to - start,
        currentTime = null;

    var animateHeight = function(timestamp){
        if (!currentTime) currentTime = timestamp;
        var progress = timestamp - currentTime;
        var val = parseInt((progress/duration)*change + start);
        // console.log(val);
        element.setAttribute("style", "height:"+val+"px;");
        if(progress < duration) {
            window.requestAnimationFrame(animateHeight);
        } else {
            cb();
        }
    };

    //set the height of the element before starting animation -> fix bug on Safari
    element.setAttribute("style", "height:"+start+"px;");
    window.requestAnimationFrame(animateHeight);
};

/*
 Smooth Scroll
 */

Util.scrollTo = function(final, duration, cb) {
    var start = window.scrollY || document.documentElement.scrollTop,
        currentTime = null;

    var animateScroll = function(timestamp){
        if (!currentTime) currentTime = timestamp;
        var progress = timestamp - currentTime;
        if(progress > duration) progress = duration;
        var val = Math.easeInOutQuad(progress, start, final-start, duration);
        window.scrollTo(0, val);
        if(progress < duration) {
            window.requestAnimationFrame(animateScroll);
        } else {
            cb && cb();
        }
    };

    window.requestAnimationFrame(animateScroll);
};

/*
 Focus utility classes
 */

//Move focus to an element
Util.moveFocus = function (element) {
    if( !element ) element = document.getElementsByTagName("body")[0];
    element.focus();
    if (document.activeElement !== element) {
        element.setAttribute('tabindex','-1');
        element.focus();
    }
};

/*
 Misc
 */

Util.getIndexInArray = function(array, el) {
    return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
    if('CSS' in window) {
        return CSS.supports(property, value);
    } else {
        var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
        return jsProperty in document.body.style;
    }
};

/*
 Polyfills
 */
//Closest() method
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}

/*
 Animation curves
 */
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};


window.FontAwesomeKitConfig = {"asyncLoading":{"enabled":false},"autoA11y":{"enabled":true},"baseUrl":"https://kit-free.fontawesome.com","detectConflictsUntil":null,"license":"free","method":"css","minify":{"enabled":true},"v4FontFaceShim":{"enabled":true},"v4shim":{"enabled":true},"version":"latest"};
!function(){function r(e){var t,n=[],i=document,o=i.documentElement.doScroll,r="DOMContentLoaded",a=(o?/^loaded|^c/:/^loaded|^i|^c/).test(i.readyState);a||i.addEventListener(r,t=function(){for(i.removeEventListener(r,t),a=1;t=n.shift();)t()}),a?setTimeout(e,0):n.push(e)}!function(){if(!(void 0===window.Element||"classList"in document.documentElement)){var e,t,n,i=Array.prototype,o=i.push,r=i.splice,a=i.join;d.prototype={add:function(e){this.contains(e)||(o.call(this,e),this.el.className=this.toString())},contains:function(e){return-1!=this.el.className.indexOf(e)},item:function(e){return this[e]||null},remove:function(e){if(this.contains(e)){for(var t=0;t<this.length&&this[t]!=e;t++);r.call(this,t,1),this.el.className=this.toString()}},toString:function(){return a.call(this," ")},toggle:function(e){return this.contains(e)?this.remove(e):this.add(e),this.contains(e)}},window.DOMTokenList=d,e=Element.prototype,t="classList",n=function(){return new d(this)},Object.defineProperty?Object.defineProperty(e,t,{get:n}):e.__defineGetter__(t,n)}function d(e){for(var t=(this.el=e).className.replace(/^\s+|\s+$/g,"").split(/\s+/),n=0;n<t.length;n++)o.call(this,t[n])}}();function a(e){var t,n,i,o;prefixesArray=e||["fa"],prefixesSelectorString="."+Array.prototype.join.call(e,",."),t=document.querySelectorAll(prefixesSelectorString),Array.prototype.forEach.call(t,function(e){n=e.getAttribute("title"),e.setAttribute("aria-hidden","true"),i=!e.nextElementSibling||!e.nextElementSibling.classList.contains("sr-only"),n&&i&&((o=document.createElement("span")).innerHTML=n,o.classList.add("sr-only"),e.parentNode.insertBefore(o,e.nextSibling))})}var d=function(e,t){var n=document.createElement("link");n.href=e,n.media="all",n.rel="stylesheet",t&&t.detectingConflicts&&t.detectionIgnoreAttr&&n.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)),document.getElementsByTagName("head")[0].appendChild(n)},c=function(e,t){!function(e,t){var n,i=t&&t.before||void 0,o=t&&t.media||void 0,r=window.document,a=r.createElement("link");if(t&&t.detectingConflicts&&t.detectionIgnoreAttr&&a.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)),i)n=i;else{var d=(r.body||r.getElementsByTagName("head")[0]).childNodes;n=d[d.length-1]}var c=r.styleSheets;a.rel="stylesheet",a.href=e,a.media="only x",function e(t){if(r.body)return t();setTimeout(function(){e(t)})}(function(){n.parentNode.insertBefore(a,i?n:n.nextSibling)});var s=function(e){for(var t=a.href,n=c.length;n--;)if(c[n].href===t)return e();setTimeout(function(){s(e)})};function l(){a.addEventListener&&a.removeEventListener("load",l),a.media=o||"all"}a.addEventListener&&a.addEventListener("load",l),(a.onloadcssdefined=s)(l)}(e,t)},e=function(e,t,n){var i=t&&void 0!==t.autoFetchSvg?t.autoFetchSvg:void 0,o=t&&void 0!==t.async?t.async:void 0,r=t&&void 0!==t.autoA11y?t.autoA11y:void 0,a=document.createElement("script"),d=document.scripts[0];a.src=e,void 0!==r&&a.setAttribute("data-auto-a11y",r?"true":"false"),i&&(a.setAttributeNode(document.createAttribute("data-auto-fetch-svg")),a.setAttribute("data-fetch-svg-from",t.fetchSvgFrom)),o&&a.setAttributeNode(document.createAttribute("defer")),n&&n.detectingConflicts&&n.detectionIgnoreAttr&&a.setAttributeNode(document.createAttribute(n.detectionIgnoreAttr)),d.parentNode.appendChild(a)};function s(e,t){var n=t&&t.addOn||"",i=t&&t.baseFilename||e.license+n,o=t&&t.minify?".min":"",r=t&&t.fileSuffix||e.method,a=t&&t.subdir||e.method;return e.baseUrl+"/releases/"+("latest"===e.version?"latest":"v".concat(e.version))+"/"+a+"/"+i+o+"."+r}var t,n,i,o,l;try{if(window.FontAwesomeKitConfig){var u,f=window.FontAwesomeKitConfig,m={detectingConflicts:f.detectConflictsUntil&&new Date<=new Date(f.detectConflictsUntil),detectionIgnoreAttr:"data-fa-detection-ignore",detectionTimeoutAttr:"data-fa-detection-timeout",detectionTimeout:null};"js"===f.method&&(o=m,l={async:(i=f).asyncLoading.enabled,autoA11y:i.autoA11y.enabled},"pro"===i.license&&(l.autoFetchSvg=!0,l.fetchSvgFrom=i.baseUrl+"/releases/"+("latest"===i.version?"latest":"v".concat(i.version))+"/svgs"),i.v4shim.enabled&&e(s(i,{addOn:"-v4-shims",minify:i.minify.enabled})),e(s(i,{minify:i.minify.enabled}),l,o)),"css"===f.method&&function(e,t){var n,i=a.bind(a,["fa","fab","fas","far","fal","fad"]);e.autoA11y.enabled&&(r(i),n=i,"undefined"!=typeof MutationObserver&&new MutationObserver(n).observe(document,{childList:!0,subtree:!0})),e.v4shim.enabled&&(e.license,e.asyncLoading.enabled?c(s(e,{addOn:"-v4-shims",minify:e.minify.enabled}),t):d(s(e,{addOn:"-v4-shims",minify:e.minify.enabled}),t));e.v4FontFaceShim.enabled&&(e.asyncLoading.enabled?c(s(e,{addOn:"-v4-font-face",minify:e.minify.enabled}),t):d(s(e,{addOn:"-v4-font-face",minify:e.minify.enabled}),t));var o=s(e,{minify:e.minify.enabled});e.asyncLoading.enabled?c(o,t):d(o,t)}(f,m),m.detectingConflicts&&((u=document.currentScript.getAttribute(m.detectionTimeoutAttr))&&(m.detectionTimeout=u),document.currentScript.setAttributeNode(document.createAttribute(m.detectionIgnoreAttr)),t=f,n=m,r(function(){var e=document.createElement("script");n&&n.detectionIgnoreAttr&&e.setAttributeNode(document.createAttribute(n.detectionIgnoreAttr)),n&&n.detectionTimeoutAttr&&n.detectionTimeout&&e.setAttribute(n.detectionTimeoutAttr,n.detectionTimeout),e.src=s(t,{baseFilename:"conflict-detection",fileSuffix:"js",subdir:"js",minify:t.minify.enabled}),e.async=!0,document.body.appendChild(e)}))}}catch(e){}}();


function _typeof(a) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
        return typeof a
    } : function (a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
    }, _typeof(a)
}
(function (a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = b() : a.InstagramFeed = b()
})(this, function () {
    function a(a) {
        return a.replace(/[&<>"'`=\/]/g, function (a) {
            return d[a]
        })
    }

    var b = {
        host: "https://www.instagram.com/",
        username: "",
        tag: "",
        container: "",
        display_profile: !0,
        display_biography: !0,
        display_gallery: !0,
        display_igtv: !1,
        get_data: !1,
        callback: null,
        styling: !0,
        items: 8,
        items_per_row: 4,
        margin: .5,
        image_size: 640
    }, c = {150: 0, 240: 1, 320: 2, 480: 3, 640: 4}, d = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
    };
    return function (d) {
        this.options = Object.assign({}, b), this.options = Object.assign(this.options, d), this.is_tag = "" == this.options.username, this.valid = !0, "" == this.options.username && "" == this.options.tag ? (console.error("InstagramFeed: Error, no username or tag defined."), this.valid = !1) : this.options.get_data || "" != this.options.container ? this.options.get_data && "function" != typeof this.options.callback && (console.error("InstagramFeed: Error, invalid or undefined callback for get_data"), this.valid = !1) : (console.error("InstagramFeed: Error, no container found."), this.valid = !1), this.get = function (a) {
            var b = this.is_tag ? this.options.host + "explore/tags/" + this.options.tag + "/" : this.options.host + this.options.username + "/", c = new XMLHttpRequest, d = this;
            c.onload = function () {
                if (4 === c.readyState)if (200 === c.status) {
                    var b = c.responseText.split("window._sharedData = ")[1].split("</script>")[0];
                    if (b = JSON.parse(b.substr(0, b.length - 1)), b = b.entry_data.ProfilePage || b.entry_data.TagPage, "undefined" == typeof b)return void console.error("Instagram Feed: It looks like YOUR network has been temporary banned because of too many requests. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25");
                    b = b[0].graphql.user || b[0].graphql.hashtag, a(b, d)
                } else console.error("InstagramFeed: Request error. Response: " + c.statusText)
            }, c.open("GET", b, !0), c.send()
        }, this.parse_caption = function (a, b) {
            return "undefined" != typeof a.node.edge_media_to_caption.edges[0] && "undefined" != typeof a.node.edge_media_to_caption.edges[0].node && "undefined" != typeof a.node.edge_media_to_caption.edges[0].node.text && null !== a.node.edge_media_to_caption.edges[0].node.text ? a.node.edge_media_to_caption.edges[0].node.text : "undefined" != typeof a.node.title && null !== a.node.title && 0 != a.node.title.length ? a.node.title : "undefined" != typeof a.node.accessibility_caption && null !== a.node.accessibility_caption && 0 != a.node.accessibility_caption.length ? a.node.accessibility_caption : (this.is_tag ? b.name : b.username) + " image "
        }, this.display = function (b) {
            if (this.options.styling)var d = (100 - 2 * this.options.margin * this.options.items_per_row) / this.options.items_per_row, e = {
                profile_container: " style='text-align:center;'",
                profile_image: " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'",
                profile_name: " style='font-size:1.2em;'",
                profile_biography: " style='font-size:1em;'",
                gallery_image: " style='margin:" + this.options.margin + "% " + this.options.margin + "%;width:" + d + "%;float:left;'"
            }; else var e = {
                profile_container: "",
                profile_image: "",
                profile_name: "",
                profile_biography: "",
                gallery_image: ""
            };
            var f = "";
            if (this.options.display_profile && (f += "<div class='instagram_profile'" + e.profile_container + ">", f += "<img class='instagram_profile_image' src='" + b.profile_pic_url + "' alt='" + (this.is_tag ? b.name + " tag pic" : b.username + " profile pic") + " profile pic'" + e.profile_image + " />", f += this.is_tag ? "<p class='instagram_tag'" + e.profile_name + "><a href='https://www.instagram.com/explore/tags/" + this.options.tag + "' rel='noopener' target='_blank'>#" + this.options.tag + "</a></p>" : "<p class='instagram_username'" + e.profile_name + ">@" + b.full_name + " (<a href='https://www.instagram.com/" + this.options.username + "' rel='noopener' target='_blank'>@" + this.options.username + "</a>)</p>", !this.is_tag && this.options.display_biography && (f += "<p class='instagram_biography'" + e.profile_biography + ">" + b.biography + "</p>"), f += "</div>"), this.options.display_gallery) {
                var g = "undefined" == typeof c[this.options.image_size] ? c[640] : c[this.options.image_size];
                if ("undefined" != typeof b.is_private && !0 === b.is_private)f += "<p class='instagram_private'><strong>This profile is private</strong></p>"; else {
                    var h = (b.edge_owner_to_timeline_media || b.edge_hashtag_to_media).edges;
                    p = h.length > this.options.items ? this.options.items : h.length, f += "<div class='instagram_gallery'>";
                    for (var j = 0; j < p; j++) {
                        var k, l, m = "https://www.instagram.com/p/" + h[j].node.shortcode, n = a(this.parse_caption(h[j], b));
                        switch (h[j].node.__typename) {
                            case"GraphSidecar":
                                l = "sidecar", k = h[j].node.thumbnail_resources[g].src;
                                break;
                            case"GraphVideo":
                                l = "video", k = h[j].node.thumbnail_src;
                                break;
                            default:
                                l = "image", k = h[j].node.thumbnail_resources[g].src;
                        }
                        this.is_tag && (b.username = ""), f += "<a href='" + m + "' class='instagram-" + l + "' title='" + n + "' rel='noopener' target='_blank'>", f += "<img src='" + k + "' alt='" + n + "'" + e.gallery_image + " />", f += "</a>"
                    }
                    f += "</div>"
                }
            }
            if (this.options.display_igtv && "undefined" != typeof b.edge_felix_video_timeline) {
                var o = b.edge_felix_video_timeline.edges, p = o.length > this.options.items ? this.options.items : o.length;
                if (0 < o.length) {
                    f += "<div class='instagram_igtv'>";
                    for (var j = 0; j < p; j++) {
                        var m = "https://www.instagram.com/p/" + o[j].node.shortcode, n = this.parse_caption(o[j], b);
                        f += "<a href='" + m + "' rel='noopener' title='" + n + "' target='_blank'>", f += "<img src='" + o[j].node.thumbnail_src + "' alt='" + n + "'" + e.gallery_image + " />", f += "</a>"
                    }
                    f += "</div>"
                }
            }
            this.options.container.innerHTML = f
        }, this.run = function () {
            this.get(function (a, b) {
                b.options.get_data ? b.options.callback(a) : b.display(a)
            })
        }, this.valid && this.run()
    }
});


/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.8.1
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).smkSlick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            /*_.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });*/

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

                event.stopImmediatePropagation();
                var $sf = $(this);

                setTimeout(function() {

                    if( _.options.pauseOnFocus ) {
                        _.focussed = $sf.is(':focus');
                        _.autoPlay();
                    }

                }, 0);

            });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                return (val >= 0) && (val < _.slideCount);
            });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                    if ($('#' + ariaButtonControl).length) {
                        $(this).attr({
                            'aria-describedby': ariaButtonControl
                        });
                    }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({'tabindex': '0'});
            } else {
                _.$slides.eq(i).removeAttr('tabindex');
            }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'previous'
                }, _.changeSlide);
            _.$nextArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'next'
                }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
        Slick.prototype.slickSetOption = function() {

            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var _ = this, l, item, option, value, refresh = false, type;

            if( $.type( arguments[0] ) === 'object' ) {

                option =  arguments[0];
                refresh = arguments[1];
                type = 'multiple';

            } else if ( $.type( arguments[0] ) === 'string' ) {

                option =  arguments[0];
                value = arguments[1];
                refresh = arguments[2];

                if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                    type = 'responsive';

                } else if ( typeof arguments[1] !== 'undefined' ) {

                    type = 'single';

                }

            }

            if ( type === 'single' ) {

                _.options[option] = value;


            } else if ( type === 'multiple' ) {

                $.each( option , function( opt, val ) {

                    _.options[opt] = val;

                });


            } else if ( type === 'responsive' ) {

                for ( item in value ) {

                    if( $.type( _.options.responsive ) !== 'array' ) {

                        _.options.responsive = [ value[item] ];

                    } else {

                        l = _.options.responsive.length-1;

                        // loop through the responsive object and splice out duplicates.
                        while( l >= 0 ) {

                            if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                                _.options.responsive.splice(l,1);

                            }

                            l--;

                        }

                        _.options.responsive.push( value[item] );

                    }

                }

            }

            if ( refresh ) {

                _.unload();
                _.reinit();

            }

        };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.smkSlick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                        _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                        _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
                .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                    .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.smkSlick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].smkSlick = new Slick(_[i], opt);
            else
                ret = _[i].smkSlick[opt].apply(_[i].smkSlick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


/*
 Version: 1.8.1
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);
    d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});



/********************************************
 -	THEMEPUNCH TOOLS Ver. 1.0     -
 Last Update of Tools 17.11.2014
 *********************************************/


/*
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.6
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.skinkers.com/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
if(function(t){"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],t):t(jQuery)}(function(t){var e="left",i="right",n="up",r="down",s="in",a="out",o="none",l="auto",h="swipe",u="pinch",p="tap",c="doubletap",f="longtap",d="horizontal",_="vertical",m="all",g=10,v="start",y="move",x="end",w="cancel",T="ontouchstart"in window,b=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,P=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,S="TouchSwipe";t.fn.swipe=function(O){var k=t(this),C=k.data(S);if(C&&"string"==typeof O){if(C[O])return C[O].apply(this,Array.prototype.slice.call(arguments,1));t.error("Method "+O+" does not exist on jQuery.swipe")}else if(!(C||"object"!=typeof O&&O))return function(O){!O||void 0!==O.allowPageScroll||void 0===O.swipe&&void 0===O.swipeStatus||(O.allowPageScroll=o);void 0!==O.click&&void 0===O.tap&&(O.tap=O.click);O||(O={});return O=t.extend({},t.fn.swipe.defaults,O),this.each(function(){var k=t(this),C=k.data(S);C||(C=new function(O,k){var C=T||P||!k.fallbackToMouseEvents,A=C?P?b?"MSPointerDown":"pointerdown":"touchstart":"mousedown",R=C?P?b?"MSPointerMove":"pointermove":"touchmove":"mousemove",M=C?P?b?"MSPointerUp":"pointerup":"touchend":"mouseup",E=C?null:"mouseleave",L=P?b?"MSPointerCancel":"pointercancel":"touchcancel",D=0,I=null,X=0,N=0,z=0,F=1,Y=0,j=0,B=null,G=t(O),U="start",V=0,W=null,H=0,Q=0,q=0,Z=0,$=0,K=null,J=null;try{G.bind(A,tt),G.bind(L,nt)}catch(e){t.error("events not supported "+A+","+L+" on jQuery.swipe")}function tt(s){if(!0!==G.data(S+"_intouch")&&!(t(s.target).closest(k.excludedElements,G).length>0)){var a,o,l=s.originalEvent?s.originalEvent:s,h=T?l.touches[0]:l;return U=v,T?V=l.touches.length:s.preventDefault(),D=0,I=null,j=null,X=0,N=0,z=0,F=1,Y=0,W=function(){for(var t=[],e=0;e<=5;e++)t.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return t}(),(o={})[e]=kt(e),o[i]=kt(i),o[n]=kt(n),o[r]=kt(r),B=o,wt(),!T||V===k.fingers||k.fingers===m||ft()?(Pt(0,h),H=Rt(),2==V&&(Pt(1,l.touches[1]),N=z=At(W[0].start,W[1].start)),(k.swipeStatus||k.pinchStatus)&&(a=ot(l,U))):a=!1,!1===a?(ot(l,U=w),a):(k.hold&&(J=setTimeout(t.proxy(function(){G.trigger("hold",[l.target]),k.hold&&(a=k.hold.call(G,l,l.target))},this),k.longTapThreshold)),bt(!0),null)}}function et(h){var u,p,c,f,g,v,b=h.originalEvent?h.originalEvent:h;if(U!==x&&U!==w&&!Tt()){var P,S,O,C,A,R,M,E,L,G,H,q,Z=T?b.touches[0]:b,$=St(Z);if(Q=Rt(),T&&(V=b.touches.length),k.hold&&clearTimeout(J),U=y,2==V&&(0==N?(Pt(1,b.touches[1]),N=z=At(W[0].start,W[1].start)):(St(b.touches[1]),z=At(W[0].end,W[1].end),W[0].end,W[1].end,j=F<1?a:s),F=(z/N*1).toFixed(2),Y=Math.abs(N-z)),V===k.fingers||k.fingers===m||!T||ft()){if(G=$.start,H=$.end,p=H,c=(u=G).x-p.x,f=p.y-u.y,g=Math.atan2(f,c),(v=Math.round(180*g/Math.PI))<0&&(v=360-Math.abs(v)),function(t,s){if(k.allowPageScroll===o||ft())t.preventDefault();else{var a=k.allowPageScroll===l;switch(s){case e:(k.swipeLeft&&a||!a&&k.allowPageScroll!=d)&&t.preventDefault();break;case i:(k.swipeRight&&a||!a&&k.allowPageScroll!=d)&&t.preventDefault();break;case n:(k.swipeUp&&a||!a&&k.allowPageScroll!=_)&&t.preventDefault();break;case r:(k.swipeDown&&a||!a&&k.allowPageScroll!=_)&&t.preventDefault()}}}(h,I=(q=v)<=45&&q>=0?e:q<=360&&q>=315?e:q>=135&&q<=225?i:q>45&&q<135?r:n),E=$.start,L=$.end,D=Math.round(Math.sqrt(Math.pow(L.x-E.x,2)+Math.pow(L.y-E.y,2))),X=Ct(),R=I,M=D,M=Math.max(M,Ot(R)),B[R].distance=M,(k.swipeStatus||k.pinchStatus)&&(P=ot(b,U)),!k.triggerOnTouchEnd||k.triggerOnTouchLeave){var K=!0;if(k.triggerOnTouchLeave){var tt={left:(A=(C=t(C=this)).offset()).left,right:A.left+C.outerWidth(),top:A.top,bottom:A.top+C.outerHeight()};S=$.end,O=tt,K=S.x>O.left&&S.x<O.right&&S.y>O.top&&S.y<O.bottom}!k.triggerOnTouchEnd&&K?U=at(y):k.triggerOnTouchLeave&&!K&&(U=at(x)),U!=w&&U!=x||ot(b,U)}}else ot(b,U=w);!1===P&&ot(b,U=w)}}function it(t){var e=t.originalEvent;return T&&e.touches.length>0?(q=Rt(),Z=event.touches.length+1,!0):(Tt()&&(V=Z),Q=Rt(),X=Ct(),ut()||!ht()?ot(e,U=w):k.triggerOnTouchEnd||0==k.triggerOnTouchEnd&&U===y?(t.preventDefault(),ot(e,U=x)):!k.triggerOnTouchEnd&&vt()?lt(e,U=x,p):U===y&&ot(e,U=w),bt(!1),null)}function nt(){V=0,Q=0,H=0,N=0,z=0,F=1,wt(),bt(!1)}function rt(t){var e=t.originalEvent;k.triggerOnTouchLeave&&(U=at(x),ot(e,U))}function st(){G.unbind(A,tt),G.unbind(L,nt),G.unbind(R,et),G.unbind(M,it),E&&G.unbind(E,rt),bt(!1)}function at(t){var e=t,i=pt(),n=ht(),r=ut();return!i||r?e=w:!n||t!=y||k.triggerOnTouchEnd&&!k.triggerOnTouchLeave?!n&&t==x&&k.triggerOnTouchLeave&&(e=w):e=x,e}function ot(t,e){var i=void 0;return dt()&&_t()||_t()?i=lt(t,e,h):(ct()&&ft()||ft())&&!1!==i&&(i=lt(t,e,u)),xt()&&yt()&&!1!==i?i=lt(t,e,c):X>k.longTapThreshold&&D<g&&k.longTap&&!1!==i?i=lt(t,e,f):1!==V&&T||!(isNaN(D)||D<k.threshold)||!vt()||!1===i||(i=lt(t,e,p)),e===w&&nt(),e===x&&(T?0==t.touches.length&&nt():nt()),i}function lt(o,l,d){var _=void 0;if(d==h){if(G.trigger("swipeStatus",[l,I||null,D||0,X||0,V,W]),k.swipeStatus&&!1===(_=k.swipeStatus.call(G,o,l,I||null,D||0,X||0,V,W)))return!1;if(l==x&&dt()){if(G.trigger("swipe",[I,D,X,V,W]),k.swipe&&!1===(_=k.swipe.call(G,o,I,D,X,V,W)))return!1;switch(I){case e:G.trigger("swipeLeft",[I,D,X,V,W]),k.swipeLeft&&(_=k.swipeLeft.call(G,o,I,D,X,V,W));break;case i:G.trigger("swipeRight",[I,D,X,V,W]),k.swipeRight&&(_=k.swipeRight.call(G,o,I,D,X,V,W));break;case n:G.trigger("swipeUp",[I,D,X,V,W]),k.swipeUp&&(_=k.swipeUp.call(G,o,I,D,X,V,W));break;case r:G.trigger("swipeDown",[I,D,X,V,W]),k.swipeDown&&(_=k.swipeDown.call(G,o,I,D,X,V,W))}}}if(d==u){if(G.trigger("pinchStatus",[l,j||null,Y||0,X||0,V,F,W]),k.pinchStatus&&!1===(_=k.pinchStatus.call(G,o,l,j||null,Y||0,X||0,V,F,W)))return!1;if(l==x&&ct())switch(j){case s:G.trigger("pinchIn",[j||null,Y||0,X||0,V,F,W]),k.pinchIn&&(_=k.pinchIn.call(G,o,j||null,Y||0,X||0,V,F,W));break;case a:G.trigger("pinchOut",[j||null,Y||0,X||0,V,F,W]),k.pinchOut&&(_=k.pinchOut.call(G,o,j||null,Y||0,X||0,V,F,W))}}return d==p?l!==w&&l!==x||(clearTimeout(K),clearTimeout(J),yt()&&!xt()?($=Rt(),K=setTimeout(t.proxy(function(){$=null,G.trigger("tap",[o.target]),k.tap&&(_=k.tap.call(G,o,o.target))},this),k.doubleTapThreshold)):($=null,G.trigger("tap",[o.target]),k.tap&&(_=k.tap.call(G,o,o.target)))):d==c?l!==w&&l!==x||(clearTimeout(K),$=null,G.trigger("doubletap",[o.target]),k.doubleTap&&(_=k.doubleTap.call(G,o,o.target))):d==f&&(l!==w&&l!==x||(clearTimeout(K),$=null,G.trigger("longtap",[o.target]),k.longTap&&(_=k.longTap.call(G,o,o.target)))),_}function ht(){var t=!0;return null!==k.threshold&&(t=D>=k.threshold),t}function ut(){var t=!1;return null!==k.cancelThreshold&&null!==I&&(t=Ot(I)-D>=k.cancelThreshold),t}function pt(){return!(k.maxTimeThreshold&&X>=k.maxTimeThreshold)}function ct(){var t=mt(),e=gt(),i=null===k.pinchThreshold||Y>=k.pinchThreshold;return t&&e&&i}function ft(){return!!(k.pinchStatus||k.pinchIn||k.pinchOut)}function dt(){var t=pt(),e=ht(),i=mt(),n=gt(),r=ut(),s=!r&&n&&i&&e&&t;return s}function _t(){return!!(k.swipe||k.swipeStatus||k.swipeLeft||k.swipeRight||k.swipeUp||k.swipeDown)}function mt(){return V===k.fingers||k.fingers===m||!T}function gt(){return 0!==W[0].end.x}function vt(){return!!k.tap}function yt(){return!!k.doubleTap}function xt(){if(null==$)return!1;var t=Rt();return yt()&&t-$<=k.doubleTapThreshold}function wt(){q=0,Z=0}function Tt(){var t=!1;if(q){var e=Rt()-q;e<=k.fingerReleaseThreshold&&(t=!0)}return t}function bt(t){!0===t?(G.bind(R,et),G.bind(M,it),E&&G.bind(E,rt)):(G.unbind(R,et,!1),G.unbind(M,it,!1),E&&G.unbind(E,rt,!1)),G.data(S+"_intouch",!0===t)}function Pt(t,e){var i=void 0!==e.identifier?e.identifier:0;return W[t].identifier=i,W[t].start.x=W[t].end.x=e.pageX||e.clientX,W[t].start.y=W[t].end.y=e.pageY||e.clientY,W[t]}function St(t){var e=void 0!==t.identifier?t.identifier:0,i=function(t){for(var e=0;e<W.length;e++)if(W[e].identifier==t)return W[e]}(e);return i.end.x=t.pageX||t.clientX,i.end.y=t.pageY||t.clientY,i}function Ot(t){if(B[t])return B[t].distance}function kt(t){return{direction:t,distance:0}}function Ct(){return Q-H}function At(t,e){var i=Math.abs(t.x-e.x),n=Math.abs(t.y-e.y);return Math.round(Math.sqrt(i*i+n*n))}function Rt(){var t=new Date;return t.getTime()}this.enable=function(){return G.bind(A,tt),G.bind(L,nt),G},this.disable=function(){return st(),G},this.destroy=function(){return st(),G.data(S,null),G},this.option=function(e,i){if(void 0!==k[e]){if(void 0===i)return k[e];k[e]=i}else t.error("Option "+e+" does not exist on jQuery.swipe.options");return null}}(this,O),k.data(S,C))})}.apply(this,arguments);return k},t.fn.swipe.defaults={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe"},t.fn.swipe.phases={PHASE_START:v,PHASE_MOVE:y,PHASE_END:x,PHASE_CANCEL:w},t.fn.swipe.directions={LEFT:e,RIGHT:i,UP:n,DOWN:r,IN:s,OUT:a},t.fn.swipe.pageScroll={NONE:o,HORIZONTAL:d,VERTICAL:_,AUTO:l},t.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:m}}),void 0===console){var console={};console.log=console.error=console.info=console.debug=console.warn=console.trace=console.dir=console.dirxml=console.group=console.groupEnd=console.time=console.timeEnd=console.assert=console.profile=console.groupCollapsed=function(){}}if(1==window.tplogs)try{console.groupCollapsed("ThemePunch GreenSocks Logs")}catch(t){}var oldgs=window.GreenSockGlobals;oldgs_queue=window._gsQueue;var _gsScope,punchgs=window.GreenSockGlobals={};if(1==window.tplogs)try{console.info("Build GreenSock SandBox for ThemePunch Plugins"),console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin")}catch(t){}!function(t,e){"use strict";var i,n,r=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!r.TweenLite){var s,a,o,l,h,u=function(t){var e,i=t.split("."),n=r;for(e=0;i.length>e;e++)n[i[e]]=n=n[i[e]]||{};return n},p=u("com.greensock"),c=1e-10,f=function(t){var e,i=[],n=t.length;for(e=0;e!==n;i.push(t[e++]));return i},d=function(){},_=(i=Object.prototype.toString,n=i.call([]),function(t){return null!=t&&(t instanceof Array||"object"==typeof t&&!!t.push&&i.call(t)===n)}),m={},g=function(e,i,n,s){this.sc=m[e]?m[e].sc:[],m[e]=this,this.gsClass=null,this.func=n;var a=[];this.check=function(o){for(var l,h,p,c,f=i.length,d=f;--f>-1;)(l=m[i[f]]||new g(i[f],[])).gsClass?(a[f]=l.gsClass,d--):o&&l.sc.push(this);if(0===d&&n)for(p=(h=("com.greensock."+e).split(".")).pop(),c=u(h.join("."))[p]=this.gsClass=n.apply(n,a),s&&(r[p]=c,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+e.split(".").pop(),[],function(){return c}):"TweenLite"===e&&"undefined"!=typeof module&&module.exports&&(module.exports=c)),f=0;this.sc.length>f;f++)this.sc[f].check()},this.check(!0)},v=t._gsDefine=function(t,e,i,n){return new g(t,e,i,n)},y=p._class=function(t,e,i){return e=e||function(){},v(t,[],function(){return e},i),e};v.globals=r;var x=[0,0,1,1],w=[],T=y("easing.Ease",function(t,e,i,n){this._func=t,this._type=i||0,this._power=n||0,this._params=e?x.concat(e):x},!0),b=T.map={},P=T.register=function(t,e,i,n){for(var r,s,a,o,l=e.split(","),h=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--h>-1;)for(s=l[h],r=n?y("easing."+s,null,!0):p.easing[s]||{},a=u.length;--a>-1;)o=u[a],b[s+"."+o]=b[o+s]=r[o]=t.getRatio?t:t[o]||new t};for((o=T.prototype)._calcEnd=!1,o.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,n=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?n*=n:2===i?n*=n*n:3===i?n*=n*n*n:4===i&&(n*=n*n*n*n),1===e?1-n:2===e?n:.5>t?n/2:1-n/2},a=(s=["Linear","Quad","Cubic","Quart","Quint,Strong"]).length;--a>-1;)o=s[a]+",Power"+a,P(new T(null,null,1,a),o,"easeOut",!0),P(new T(null,null,2,a),o,"easeIn"+(0===a?",easeNone":"")),P(new T(null,null,3,a),o,"easeInOut");b.linear=p.easing.Linear.easeIn,b.swing=p.easing.Quad.easeInOut;var S=y("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});(o=S.prototype).addEventListener=function(t,e,i,n,r){r=r||0;var s,a,o=this._listeners[t],u=0;for(null==o&&(this._listeners[t]=o=[]),a=o.length;--a>-1;)(s=o[a]).c===e&&s.s===i?o.splice(a,1):0===u&&r>s.pr&&(u=a+1);o.splice(u,0,{c:e,s:i,up:n,pr:r}),this!==l||h||l.wake()},o.removeEventListener=function(t,e){var i,n=this._listeners[t];if(n)for(i=n.length;--i>-1;)if(n[i].c===e)return void n.splice(i,1)},o.dispatchEvent=function(t){var e,i,n,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)(n=r[e])&&(n.up?n.c.call(n.s||i,{type:t,target:i}):n.c.call(n.s||i))};var O=t.requestAnimationFrame,k=t.cancelAnimationFrame,C=Date.now||function(){return(new Date).getTime()},A=C();for(a=(s=["ms","moz","webkit","o"]).length;--a>-1&&!O;)O=t[s[a]+"RequestAnimationFrame"],k=t[s[a]+"CancelAnimationFrame"]||t[s[a]+"CancelRequestAnimationFrame"];y("Ticker",function(t,e){var i,n,r,s,a,o=this,u=C(),p=!1!==e&&O,c=500,f=33,_=function(t){var e,l,h=C()-A;h>c&&(u+=h-f),A+=h,o.time=(A-u)/1e3,e=o.time-a,(!i||e>0||!0===t)&&(o.frame++,a+=e+(e>=s?.004:s-e),l=!0),!0!==t&&(r=n(_)),l&&o.dispatchEvent("tick")};S.call(o),o.time=o.frame=0,o.tick=function(){_(!0)},o.lagSmoothing=function(t,e){c=t||1e10,f=Math.min(e,c,0)},o.sleep=function(){null!=r&&(p&&k?k(r):clearTimeout(r),n=d,r=null,o===l&&(h=!1))},o.wake=function(){null!==r?o.sleep():o.frame>10&&(A=C()-c+5),n=0===i?d:p&&O?O:function(t){return setTimeout(t,0|1e3*(a-o.time)+1)},o===l&&(h=!0),_(2)},o.fps=function(t){return arguments.length?(s=1/((i=t)||60),a=this.time+s,void o.wake()):i},o.useRAF=function(t){return arguments.length?(o.sleep(),p=t,void o.fps(i)):p},o.fps(t),setTimeout(function(){p&&(!r||5>o.frame)&&o.useRAF(!1)},1500)}),(o=p.Ticker.prototype=new p.events.EventDispatcher).constructor=p.Ticker;var R=y("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=!0===e.immediateRender,this.data=e.data,this._reversed=!0===e.reversed,U){h||l.wake();var i=this.vars.useFrames?G:U;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});l=R.ticker=new p.Ticker,(o=R.prototype)._dirty=o._gc=o._initted=o._paused=!1,o._totalTime=o._time=0,o._rawPrevTime=-1,o._next=o._last=o._onUpdate=o._timeline=o.timeline=null,o._paused=!1;var M=function(){h&&C()-A>2e3&&l.wake(),setTimeout(M,2e3)};M(),o.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},o.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},o.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},o.seek=function(t,e){return this.totalTime(Number(t),!1!==e)},o.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,!1!==e,!0)},o.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},o.render=function(){},o.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},o.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},o._enabled=function(t,e){return h||l.wake(),this._gc=!t,this._active=this.isActive(),!0!==e&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},o._kill=function(){return this._enabled(!1,!1)},o.kill=function(t,e){return this._kill(t,e),this},o._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},o._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},o.eventCallback=function(t,e,i,n){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=_(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=n),"onUpdate"===t&&(this._onUpdate=e)}return this},o.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},o.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},o.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},o.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},o.totalTime=function(t,e,i){if(h||l.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var n=this._totalDuration,r=this._timeline;if(t>n&&!i&&(t=n),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?n-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(this.render(t,e,!1),I.length&&V())}return this},o.progress=o.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},o.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},o.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},o.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||c,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},o.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},o.paused=function(t){if(!arguments.length)return this._paused;if(t!=this._paused&&this._timeline){h||t||l.wake();var e=this._timeline,i=e.rawTime(),n=i-this._pauseTime;!t&&e.smoothChildTiming&&(this._startTime+=n,this._uncache(!1)),this._pauseTime=t?i:null,this._paused=t,this._active=this.isActive(),!t&&0!==n&&this._initted&&this.duration()&&this.render(e.smoothChildTiming?this._totalTime:(i-this._startTime)/this._timeScale,!0,!0)}return this._gc&&!t&&this._enabled(!0,!1),this};var E=y("core.SimpleTimeline",function(t){R.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});(o=E.prototype=new R).constructor=E,o.kill()._gc=!1,o._first=o._last=o._recent=null,o._sortChildren=!1,o.add=o.insert=function(t,e){var i,n;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(n=t._startTime;i&&i._startTime>n;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},o._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},o.render=function(t,e,i){var n,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)n=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=n},o.rawTime=function(){return h||l.wake(),this._totalTime};var L=y("TweenLite",function(e,i,n){if(R.call(this,i,n),this.render=L.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:L.selector(e)||e;var r,s,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),l=this.vars.overwrite;if(this._overwrite=l=null==l?B[L.defaultOverwrite]:"number"==typeof l?l>>0:B[l],(o||e instanceof Array||e.push&&_(e))&&"number"!=typeof e[0])for(this._targets=a=f(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)(s=a[r])?"string"!=typeof s?s.length&&s!==t&&s[0]&&(s[0]===t||s[0].nodeType&&s[0].style&&!s.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(f(s))):(this._siblings[r]=W(s,this,!1),1===l&&this._siblings[r].length>1&&Q(s,this,null,1,this._siblings[r])):"string"==typeof(s=a[r--]=L.selector(s))&&a.splice(r+1,1):a.splice(r--,1);else this._propLookup={},this._siblings=W(e,this,!1),1===l&&this._siblings.length>1&&Q(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&!1!==this.vars.immediateRender)&&(this._time=-c,this.render(-this._delay))},!0),D=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)};(o=L.prototype=new R).constructor=L,o.kill()._gc=!1,o.ratio=0,o._firstPT=o._targets=o._overwrittenProps=o._startAt=null,o._notifyPluginsOfEnabled=o._lazy=!1,L.version="1.14.2",L.defaultEase=o._ease=new T(null,null,1,1),L.defaultOverwrite="auto",L.ticker=l,L.autoSleep=!0,L.lagSmoothing=function(t,e){l.lagSmoothing(t,e)},L.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(L.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var I=[],X={},N=L._internals={isArray:_,isSelector:D,lazyTweens:I},z=L._plugins={},F=N.tweenLookup={},Y=0,j=N.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},B={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,true:1,false:0},G=R._rootFramesTimeline=new E,U=R._rootTimeline=new E,V=N.lazyRender=function(){var t,e=I.length;for(X={};--e>-1;)(t=I[e])&&!1!==t._lazy&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);I.length=0};U._startTime=l.time,G._startTime=l.frame,U._active=G._active=!0,setTimeout(V,1),R._updateRoot=L.render=function(){var t,e,i;if(I.length&&V(),U.render((l.time-U._startTime)*U._timeScale,!1,!1),G.render((l.frame-G._startTime)*G._timeScale,!1,!1),I.length&&V(),!(l.frame%120)){for(i in F){for(t=(e=F[i].tweens).length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete F[i]}if((!(i=U._first)||i._paused)&&L.autoSleep&&!G._first&&1===l._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||l.sleep()}}},l.addEventListener("tick",R._updateRoot);var W=function(t,e,i){var n,r,s=t._gsTweenID;if(F[s||(t._gsTweenID=s="t"+Y++)]||(F[s]={target:t,tweens:[]}),e&&((n=F[s].tweens)[r=n.length]=e,i))for(;--r>-1;)n[r]===e&&n.splice(r,1);return F[s].tweens},H=function(t,e,i,n){var r,s,a=t.vars.onOverwrite;return a&&(r=a(t,e,i,n)),(a=L.onOverwrite)&&(s=a(t,e,i,n)),!1!==r&&!1!==s},Q=function(t,e,i,n,r){var s,a,o,l;if(1===n||n>=4){for(l=r.length,s=0;l>s;s++)if((o=r[s])!==e)o._gc||H(o,e)&&o._enabled(!1,!1)&&(a=!0);else if(5===n)break;return a}var h,u=e._startTime+c,p=[],f=0,d=0===e._duration;for(s=r.length;--s>-1;)(o=r[s])===e||o._gc||o._paused||(o._timeline!==e._timeline?(h=h||q(e,0,d),0===q(o,h,d)&&(p[f++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((d||!o._initted)&&2e-10>=u-o._startTime||(p[f++]=o)));for(s=f;--s>-1;)if(o=p[s],2===n&&o._kill(i,t,e)&&(a=!0),2!==n||!o._firstPT&&o._initted){if(2!==n&&!H(o,e))continue;o._enabled(!1,!1)&&(a=!0)}return a},q=function(t,e,i){for(var n=t._timeline,r=n._timeScale,s=t._startTime;n._timeline;){if(s+=n._startTime,r*=n._timeScale,n._paused)return-100;n=n._timeline}return(s/=r)>e?s-e:i&&s===e||!t._initted&&2*c>s-e?c:(s+=t.totalDuration()/t._timeScale/r)>e+c?0:s-e-c};o._init=function(){var t,e,i,n,r,s=this.vars,a=this._overwrittenProps,o=this._duration,l=!!s.immediateRender,h=s.ease;if(s.startAt){for(n in this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={},s.startAt)r[n]=s.startAt[n];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=l&&!1!==s.lazy,r.startAt=r.delay=null,this._startAt=L.to(this.target,0,r),l)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(s.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{for(n in 0!==this._time&&(l=!1),i={},s)j[n]&&"autoCSS"!==n||(i[n]=s[n]);if(i.overwrite=0,i.data="isFromStart",i.lazy=l&&!1!==s.lazy,i.immediateRender=l,this._startAt=L.to(this.target,0,i),l){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=h=h?h instanceof T?h:"function"==typeof h?new T(h,s.easeParams):b[h]||L.defaultEase:L.defaultEase,s.easeParams instanceof Array&&h.config&&(this._ease=h.config.apply(h,s.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&L._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),s.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=s.onUpdate,this._initted=!0},o._initProps=function(e,i,n,r){var s,a,o,l,h,u;if(null==e)return!1;for(s in X[e._gsTweenID]&&V(),this.vars.css||e.style&&e!==t&&e.nodeType&&z.css&&!1!==this.vars.autoCSS&&function(t,e){var i,n={};for(i in t)j[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!z[i]||z[i]&&z[i]._autoCSS)||(n[i]=t[i],delete t[i]);t.css=n}(this.vars,e),this.vars){if(u=this.vars[s],j[s])u&&(u instanceof Array||u.push&&_(u))&&-1!==u.join("").indexOf("{self}")&&(this.vars[s]=u=this._swapSelfInParams(u,this));else if(z[s]&&(l=new z[s])._onInitTween(e,this.vars[s],this)){for(this._firstPT=h={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:!0,n:s,pg:!0,pr:l._priority},a=l._overwriteProps.length;--a>-1;)i[l._overwriteProps[a]]=this._firstPT;(l._priority||l._onInitAllProps)&&(o=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[s]=h={_next:this._firstPT,t:e,p:s,f:"function"==typeof e[s],n:s,pg:!1,pr:0},h.s=h.f?e[s.indexOf("set")||"function"!=typeof e["get"+s.substr(3)]?s:"get"+s.substr(3)]():parseFloat(e[s]),h.c="string"==typeof u&&"="===u.charAt(1)?parseInt(u.charAt(0)+"1",10)*Number(u.substr(2)):Number(u)-h.s||0;h&&h._next&&(h._next._prev=h)}return r&&this._kill(r,e)?this._initProps(e,i,n,r):this._overwrite>1&&this._firstPT&&n.length>1&&Q(e,this,i,this._overwrite,n)?(this._kill(i,e),this._initProps(e,i,n,r)):(this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration)&&(X[e._gsTweenID]=!0),o)},o.render=function(t,e,i){var n,r,s,a,o=this._time,l=this._duration,h=this._rawPrevTime;if(t>=l)this._totalTime=this._time=l,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(n=!0,r="onComplete"),0===l&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>h||h===c)&&h!==t&&(i=!0,h>c&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||h===t?t:c);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===l&&h>0&&h!==c)&&(r="onReverseComplete",n=this._reversed),0>t&&(this._active=!1,0===l&&(this._initted||!this.vars.lazy||i)&&(h>=0&&(i=!0),this._rawPrevTime=a=!e||t||h===t?t:c)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var u=t/l,p=this._easeType,f=this._easePower;(1===p||3===p&&u>=.5)&&(u=1-u),3===p&&(u*=2),1===f?u*=u:2===f?u*=u*u:3===f?u*=u*u*u:4===f&&(u*=u*u*u*u),this.ratio=1===p?1-u:2===p?u:.5>t/l?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/l);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=h,I.push(this),void(this._lazy=[t,e]);this._time&&!n?this.ratio=this._ease.getRatio(this._time/l):n&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(!1!==this._lazy&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===l)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||w))),s=this._firstPT;s;)s.f?s.t[s.p](s.c*this.ratio+s.s):s.t[s.p]=s.c*this.ratio+s.s,s=s._next;this._onUpdate&&(0>t&&this._startAt&&-1e-4!==t&&this._startAt.render(t,e,i),e||(this._time!==o||n)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||w)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&-1e-4!==t&&this._startAt.render(t,e,i),n&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||w),0===l&&this._rawPrevTime===c&&a!==c&&(this._rawPrevTime=0))}},o._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);var n,r,s,a,o,l,h,u,p;if(e="string"!=typeof e?e||this._targets||this.target:L.selector(e)||e,(_(e)||D(e))&&"number"!=typeof e[0])for(n=e.length;--n>-1;)this._kill(t,e[n])&&(l=!0);else{if(this._targets){for(n=this._targets.length;--n>-1;)if(e===this._targets[n]){o=this._propLookup[n]||{},this._overwrittenProps=this._overwrittenProps||[],r=this._overwrittenProps[n]=t?this._overwrittenProps[n]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,r=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(h=t||o,u=t!==r&&"all"!==r&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(L.onOverwrite||this.vars.onOverwrite)){for(s in h)o[s]&&(p||(p=[]),p.push(s));if(!H(this,i,e,p))return!1}for(s in h)(a=o[s])&&(a.pg&&a.t._kill(h)&&(l=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[s]),u&&(r[s]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},o.invalidate=function(){return this._notifyPluginsOfEnabled&&L._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],R.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-c,this.render(-this._delay)),this},o._enabled=function(t,e){if(h||l.wake(),t&&this._gc){var i,n=this._targets;if(n)for(i=n.length;--i>-1;)this._siblings[i]=W(n[i],this,!0);else this._siblings=W(this.target,this,!0)}return R.prototype._enabled.call(this,t,e),!(!this._notifyPluginsOfEnabled||!this._firstPT)&&L._onPluginEvent(t?"_onEnable":"_onDisable",this)},L.to=function(t,e,i){return new L(t,e,i)},L.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new L(t,e,i)},L.fromTo=function(t,e,i,n){return n.startAt=i,n.immediateRender=0!=n.immediateRender&&0!=i.immediateRender,new L(t,e,n)},L.delayedCall=function(t,e,i,n,r){return new L(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:n,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:n,immediateRender:!1,useFrames:r,overwrite:0})},L.set=function(t,e){return new L(t,0,e)},L.getTweensOf=function(t,e){if(null==t)return[];var i,n,r,s;if(t="string"!=typeof t?t:L.selector(t)||t,(_(t)||D(t))&&"number"!=typeof t[0]){for(i=t.length,n=[];--i>-1;)n=n.concat(L.getTweensOf(t[i],e));for(i=n.length;--i>-1;)for(s=n[i],r=i;--r>-1;)s===n[r]&&n.splice(i,1)}else for(i=(n=W(t).concat()).length;--i>-1;)(n[i]._gc||e&&!n[i].isActive())&&n.splice(i,1);return n},L.killTweensOf=L.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var n=L.getTweensOf(t,e),r=n.length;--r>-1;)n[r]._kill(i,t)};var Z=y("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=Z.prototype},!0);if(o=Z.prototype,Z.version="1.10.1",Z.API=2,o._firstPT=null,o._addTween=function(t,e,i,n,r,s){var a,o;return null!=n&&(a="number"==typeof n||"="!==n.charAt(1)?Number(n)-i:parseInt(n.charAt(0)+"1",10)*Number(n.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:s},o._next&&(o._next._prev=o),o):void 0},o.setRatio=function(t){for(var e,i=this._firstPT;i;)e=i.c*t+i.s,i.r?e=Math.round(e):1e-6>e&&e>-1e-6&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},o._kill=function(t){var e,i=this._overwriteProps,n=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;n;)null!=t[n.n]&&(n._next&&(n._next._prev=n._prev),n._prev?(n._prev._next=n._next,n._prev=null):this._firstPT===n&&(this._firstPT=n._next)),n=n._next;return!1},o._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},L._onPluginEvent=function(t,e){var i,n,r,s,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,n=r;n&&n.pr>o.pr;)n=n._next;(o._prev=n?n._prev:s)?o._prev._next=o:r=o,(o._next=n)?n._prev=o:s=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},Z.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===Z.API&&(z[(new t[e])._propName]=t[e]);return!0},v.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,n=t.priority||0,r=t.overwriteProps,s={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=y("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){Z.call(this,i,n),this._overwriteProps=r||[]},!0===t.global),o=a.prototype=new Z(i);for(e in o.constructor=a,a.API=t.API,s)"function"==typeof t[e]&&(o[s[e]]=t[e]);return a.version=t.version,Z.activate([a]),a},s=t._gsQueue){for(a=0;s.length>a;a++)s[a]();for(o in m)m[o].func||t.console.log("GSAP encountered missing dependency: com.greensock."+o)}h=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window),((_gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window)._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var n=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=!0===this.vars.autoRemoveChildren,this.smoothChildTiming=!0===this.vars.smoothChildTiming,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,n,r=this.vars;for(n in r)i=r[n],o(i)&&-1!==i.join("").indexOf("{self}")&&(r[n]=this._swapSelfInParams(i));o(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,s=i._internals,a=s.isSelector,o=s.isArray,l=s.lazyTweens,h=s.lazyRender,u=[],p=_gsScope._gsDefine.globals,c=function(t){var e,i={};for(e in t)i[e]=t[e];return i},f=function(t,e,i,n){var r=t._timeline._totalTime;(e||!this._forcingPlayhead)&&(t._timeline.pause(t._startTime),e&&e.apply(n||t._timeline,i||u),this._forcingPlayhead&&t._timeline.seek(r))},d=function(t){var e,i=[],n=t.length;for(e=0;e!==n;i.push(t[e++]));return i},_=n.prototype=new e;return n.version="1.14.2",_.constructor=n,_.kill()._gc=_._forcingPlayhead=!1,_.to=function(t,e,n,r){var s=n.repeat&&p.TweenMax||i;return e?this.add(new s(t,e,n),r):this.set(t,n,r)},_.from=function(t,e,n,r){return this.add((n.repeat&&p.TweenMax||i).from(t,e,n),r)},_.fromTo=function(t,e,n,r,s){var a=r.repeat&&p.TweenMax||i;return e?this.add(a.fromTo(t,e,n,r),s):this.set(t,r,s)},_.staggerTo=function(t,e,r,s,o,l,h,u){var p,f=new n({onComplete:l,onCompleteParams:h,onCompleteScope:u,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),a(t=t||[])&&(t=d(t)),0>(s=s||0)&&((t=d(t)).reverse(),s*=-1),p=0;t.length>p;p++)r.startAt&&(r.startAt=c(r.startAt)),f.to(t[p],e,c(r),p*s);return this.add(f,o)},_.staggerFrom=function(t,e,i,n,r,s,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,n,r,s,a,o)},_.staggerFromTo=function(t,e,i,n,r,s,a,o,l){return n.startAt=i,n.immediateRender=0!=n.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,n,r,s,a,o,l)},_.call=function(t,e,n,r){return this.add(i.delayedCall(0,t,e,n),r)},_.set=function(t,e,n){return n=this._parseTimeOrLabel(n,0,!0),null==e.immediateRender&&(e.immediateRender=n===this._time&&!this._paused),this.add(new i(t,0,e),n)},n.exportRoot=function(t,e){null==(t=t||{}).smoothChildTiming&&(t.smoothChildTiming=!0);var r,s,a=new n(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)s=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=s;return o.add(a,0),a},_.add=function(r,s,a,l){var h,u,p,c,f,d;if("number"!=typeof s&&(s=this._parseTimeOrLabel(s,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&o(r)){for(a=a||"normal",l=l||0,h=s,u=r.length,p=0;u>p;p++)o(c=r[p])&&(c=new n({tweens:c})),this.add(c,h),"string"!=typeof c&&"function"!=typeof c&&("sequence"===a?h=c._startTime+c.totalDuration()/c._timeScale:"start"===a&&(c._startTime-=c.delay())),h+=l;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,s);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,s),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(d=(f=this).rawTime()>r._startTime;f._timeline;)d&&f._timeline.smoothChildTiming?f.totalTime(f._totalTime,!0):f._gc&&f._enabled(!0,!1),f=f._timeline;return this},_.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&o(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},_._remove=function(t,i){e.prototype._remove.call(this,t,i);var n=this._last;return n?this._time>n._startTime+n._totalDuration/n._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},_.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},_.insert=_.insertMultiple=function(t,e,i,n){return this.add(t,e||0,i,n)},_.appendMultiple=function(t,e,i,n){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,n)},_.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},_.addPause=function(t,e,i,n){return this.call(f,["{self}",e,i,n],this,t)},_.removeLabel=function(t){return delete this._labels[t],this},_.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},_._parseTimeOrLabel=function(e,i,n,r){var s;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&o(r)))for(s=r.length;--s>-1;)r[s]instanceof t&&r[s].timeline===this&&this.remove(r[s]);if("string"==typeof i)return this._parseTimeOrLabel(i,n&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,n);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(-1===(s=e.indexOf("=")))return null==this._labels[e]?n?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(s-1)+"1",10)*Number(e.substr(s+1)),e=s>1?this._parseTimeOrLabel(e.substr(0,s-1),0,n):this.duration()}return Number(e)+i},_.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),!1!==e)},_.stop=function(){return this.paused(!0)},_.gotoAndPlay=function(t,e){return this.play(t,e)},_.gotoAndStop=function(t,e){return this.pause(t,e)},_.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var n,s,a,o,p,c=this._dirty?this.totalDuration():this._totalDuration,f=this._time,d=this._startTime,_=this._timeScale,m=this._paused;if(t>=c?(this._totalTime=this._time=c,this._reversed||this._hasPausedChild()||(s=!0,o="onComplete",0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(p=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=c+1e-4):1e-7>t?(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",s=this._reversed),0>t?(this._active=!1,this._rawPrevTime>=0&&this._first&&(p=!0),this._rawPrevTime=t):(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=0,this._initted||(p=!0))):this._totalTime=this._time=this._rawPrevTime=t,this._time!==f&&this._first||i||p){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||u)),this._time>=f)for(n=this._first;n&&(a=n._next,!this._paused||m);)(n._active||n._startTime<=this._time&&!n._paused&&!n._gc)&&(n._reversed?n.render((n._dirty?n.totalDuration():n._totalDuration)-(t-n._startTime)*n._timeScale,e,i):n.render((t-n._startTime)*n._timeScale,e,i)),n=a;else for(n=this._last;n&&(a=n._prev,!this._paused||m);)(n._active||f>=n._startTime&&!n._paused&&!n._gc)&&(n._reversed?n.render((n._dirty?n.totalDuration():n._totalDuration)-(t-n._startTime)*n._timeScale,e,i):n.render((t-n._startTime)*n._timeScale,e,i)),n=a;this._onUpdate&&(e||(l.length&&h(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||u))),o&&(this._gc||(d===this._startTime||_!==this._timeScale)&&(0===this._time||c>=this.totalDuration())&&(s&&(l.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||u)))}},_._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof n&&t._hasPausedChild())return!0;t=t._next}return!1},_.getChildren=function(t,e,n,r){r=r||-9999999999;for(var s=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?!1!==e&&(s[o++]=a):(!1!==n&&(s[o++]=a),!1!==t&&(o=(s=s.concat(a.getChildren(!0,e,n))).length))),a=a._next;return s},_.getTweensOf=function(t,e){var n,r,s=this._gc,a=[],o=0;for(s&&this._enabled(!0,!0),r=(n=i.getTweensOf(t)).length;--r>-1;)(n[r].timeline===this||e&&this._contains(n[r]))&&(a[o++]=n[r]);return s&&this._enabled(!1,!0),a},_.recent=function(){return this._recent},_._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},_.shiftChildren=function(t,e,i){i=i||0;for(var n,r=this._first,s=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(n in s)s[n]>=i&&(s[n]+=t);return this._uncache(!0)},_._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),n=i.length,r=!1;--n>-1;)i[n]._kill(t,e)&&(r=!0);return r},_.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return!1!==t&&(this._labels={}),this._uncache(!0)},_.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},_._enabled=function(t,i){if(t===this._gc)for(var n=this._first;n;)n._enabled(t,!0),n=n._next;return e.prototype._enabled.call(this,t,i)},_.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},_.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},_.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,n=0,r=this._last,s=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>s&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):s=r._startTime,0>r._startTime&&!r._paused&&(n-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),s=0),(i=r._startTime+r._totalDuration/r._timeScale)>n&&(n=i),r=e;this._duration=this._totalDuration=n,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},_.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},_.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},n},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope).TimelineLite};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=e())}(),((_gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window)._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,n,r=_gsScope.GreenSockGlobals||_gsScope,s=r.com.greensock,a=2*Math.PI,o=Math.PI/2,l=s._class,h=function(e,i){var n=l("easing."+e,function(){},!0),r=n.prototype=new t;return r.constructor=n,r.getRatio=i,n},u=t.register||function(){},p=function(t,e,i,n){var r=l("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new n},!0);return u(r,t),r},c=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},f=function(e,i){var n=l("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=n.prototype=new t;return r.constructor=n,r.getRatio=i,r.config=function(t){return new n(t)},n},d=p("Back",f("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),f("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),f("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),_=l("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=!0===i},!0),m=_.prototype=new t;return m.constructor=_,m.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},_.ease=new _(.7,.7),m.config=_.config=function(t,e,i){return new _(t,e,i)},(m=(e=l("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0)).prototype=new t).constructor=e,m.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},m.config=e.config=function(t){return new e(t)},(m=(i=l("easing.RoughEase",function(e){for(var i,n,r,s,a,o,l=(e=e||{}).taper||"none",h=[],u=0,p=0|(e.points||20),f=p,d=!1!==e.randomize,_=!0===e.clamp,m=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--f>-1;)i=d?Math.random():1/p*f,n=m?m.getRatio(i):i,"none"===l?r=g:"out"===l?r=(s=1-i)*s*g:"in"===l?r=i*i*g:.5>i?r=.5*(s=2*i)*s*g:r=.5*(s=2*(1-i))*s*g,d?n+=Math.random()*r-.5*r:f%2?n+=.5*r:n-=.5*r,_&&(n>1?n=1:0>n&&(n=0)),h[u++]={x:i,y:n};for(h.sort(function(t,e){return t.x-e.x}),o=new c(1,1,null),f=p;--f>-1;)a=h[f],o=new c(a.x,a.y,o);this._prev=new c(0,0,0!==o.t?o:o.next)},!0)).prototype=new t).constructor=i,m.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},m.config=function(t){return new i(t)},i.ease=new i,p("Bounce",h("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),h("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),h("BounceInOut",function(t){var e=.5>t;return t=1/2.75>(t=e?1-2*t:2*t-1)?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),p("Circ",h("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),h("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),h("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),p("Elastic",(n=function(e,i,n){var r=l("easing."+e,function(t,e){this._p1=t||1,this._p2=e||n,this._p3=this._p2/a*(Math.asin(1/this._p1)||0)},!0),s=r.prototype=new t;return s.constructor=r,s.getRatio=i,s.config=function(t,e){return new r(t,e)},r})("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*a/this._p2)+1},.3),n("ElasticIn",function(t){return-this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2)},.3),n("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*a/this._p2)+1},.45)),p("Expo",h("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),h("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),h("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),p("Sine",h("SineOut",function(t){return Math.sin(t*o)}),h("SineIn",function(t){return 1-Math.cos(t*o)}),h("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),l("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),u(r.SlowMo,"SlowMo","ease,"),u(i,"RoughEase","ease,"),u(e,"SteppedEase","ease,"),d},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),((_gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window)._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,n,r,s,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o={},l=a.prototype=new t("css");l.constructor=a,a.version="1.14.2",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",l="px",a.suffixMap={top:l,right:l,bottom:l,left:l,width:l,height:l,fontSize:l,padding:l,margin:l,perspective:l,lineHeight:""};var h,u,p,c,f,d,_,m,g,v=/(?:\d|\-\d|\.\d|\-\.\d)+/g,y=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,x=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,w=/(?![+-]?\d*\.?\d+|e[+-]\d+)[^0-9]/g,T=/(?:\d|\-|\+|=|#|\.)*/g,b=/opacity *= *([^)]*)/i,P=/opacity:([^;]*)/i,S=/alpha\(opacity *=.+?\)/i,O=/^(rgb|hsl)/,k=/([A-Z])/g,C=/-([a-z])/gi,A=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,R=function(t,e){return e.toUpperCase()},M=/(?:Left|Right|Width)/i,E=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,L=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,I=Math.PI/180,X=180/Math.PI,N={},z=document,F=z.createElement("div"),Y=z.createElement("img"),j=a._internals={_specialProps:o},B=navigator.userAgent,G=(m=B.indexOf("Android"),g=z.createElement("div"),p=-1!==B.indexOf("Safari")&&-1===B.indexOf("Chrome")&&(-1===m||Number(B.substr(m+8,1))>3),f=p&&6>Number(B.substr(B.indexOf("Version/")+8,1)),c=-1!==B.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B))&&(d=parseFloat(RegExp.$1)),g.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",!!(_=g.getElementsByTagName("a")[0])&&/^0.55/.test(_.style.opacity)),U=function(t){return b.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},V=function(t){window.console&&console.log(t)},W="",H="",Q=function(t,e){var i,n,r=(e=e||F).style;if(void 0!==r[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],n=5;--n>-1&&void 0===r[i[n]+t];);return n>=0?(W="-"+(H=3===n?"ms":i[n]).toLowerCase()+"-",H+t):null},q=z.defaultView?z.defaultView.getComputedStyle:function(){},Z=a.getStyle=function(t,e,i,n,r){var s;return G||"opacity"!==e?(!n&&t.style[e]?s=t.style[e]:(i=i||q(t))?s=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(k,"-$1").toLowerCase()):t.currentStyle&&(s=t.currentStyle[e]),null==r||s&&"none"!==s&&"auto"!==s&&"auto auto"!==s?s:r):U(t)},$=j.convertToPixels=function(t,i,n,r,s){if("px"===r||!r)return n;if("auto"===r||!n)return 0;var o,l,h,u=M.test(i),p=t,c=F.style,f=0>n;if(f&&(n=-n),"%"===r&&-1!==i.indexOf("border"))o=n/100*(u?t.clientWidth:t.clientHeight);else{if(c.cssText="border:0 solid red;position:"+Z(t,"position")+";line-height:0;","%"!==r&&p.appendChild)c[u?"borderLeftWidth":"borderTopWidth"]=n+r;else{if(l=(p=t.parentNode||z.body)._gsCache,h=e.ticker.frame,l&&u&&l.time===h)return l.width*n/100;c[u?"width":"height"]=n+r}p.appendChild(F),o=parseFloat(F[u?"offsetWidth":"offsetHeight"]),p.removeChild(F),u&&"%"===r&&!1!==a.cacheWidths&&((l=p._gsCache=p._gsCache||{}).time=h,l.width=o/n*100),0!==o||s||(o=$(t,i,n,r,!0))}return f?-o:o},K=j.calculateOffset=function(t,e,i){if("absolute"!==Z(t,"position",i))return 0;var n="left"===e?"Left":"Top",r=Z(t,"margin"+n,i);return t["offset"+n]-($(t,e,parseFloat(r),r.replace(T,""))||0)},J=function(t,e){var i,n,r={};if(e=e||q(t,null))if(i=e.length)for(;--i>-1;)r[e[i].replace(C,R)]=e.getPropertyValue(e[i]);else for(i in e)r[i]=e[i];else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===r[i]&&(r[i.replace(C,R)]=e[i]);return G||(r.opacity=U(t)),n=Nt(t,e,!1),r.rotation=n.rotation,r.skewX=n.skewX,r.scaleX=n.scaleX,r.scaleY=n.scaleY,r.x=n.x,r.y=n.y,Rt&&(r.z=n.z,r.rotationX=n.rotationX,r.rotationY=n.rotationY,r.scaleZ=n.scaleZ),r.filters&&delete r.filters,r},tt=function(t,e,i,n,r){var s,a,o,l={},h=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(s=i[a])||r&&r[a])&&-1===a.indexOf("Origin")&&("number"==typeof s||"string"==typeof s)&&(l[a]="auto"!==s||"left"!==a&&"top"!==a?""!==s&&"auto"!==s&&"none"!==s||"string"!=typeof e[a]||""===e[a].replace(w,"")?s:0:K(t,a),void 0!==h[a]&&(o=new dt(h,a,h[a],o)));if(n)for(a in n)"className"!==a&&(l[a]=n[a]);return{difs:l,firstMPT:o}},et={width:["Left","Right"],height:["Top","Bottom"]},it=["marginLeft","marginRight","marginTop","marginBottom"],nt=function(t,e,i){var n=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),r=et[e],s=r.length;for(i=i||q(t,null);--s>-1;)n-=parseFloat(Z(t,"padding"+r[s],i,!0))||0,n-=parseFloat(Z(t,"border"+r[s]+"Width",i,!0))||0;return n},rt=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),n=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],r=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==r?r="0":"center"===r&&(r="50%"),("center"===n||isNaN(parseFloat(n))&&-1===(n+"").indexOf("="))&&(n="50%"),e&&(e.oxp=-1!==n.indexOf("%"),e.oyp=-1!==r.indexOf("%"),e.oxr="="===n.charAt(1),e.oyr="="===r.charAt(1),e.ox=parseFloat(n.replace(w,"")),e.oy=parseFloat(r.replace(w,""))),n+" "+r+(i.length>2?" "+i[2]:"")},st=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},at=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ot=function(t,e,i,n){var r,s,a,o;return null==t?o=e:"number"==typeof t?o=t:(r=360,s=t.split("_"),a=Number(s[0].replace(w,""))*(-1===t.indexOf("rad")?1:X)-("="===t.charAt(1)?0:e),s.length&&(n&&(n[i]=e+a),-1!==t.indexOf("short")&&((a%=r)!==a%180&&(a=0>a?a+r:a-r)),-1!==t.indexOf("_cw")&&0>a?a=(a+3599999999640)%r-(0|a/r)*r:-1!==t.indexOf("ccw")&&a>0&&(a=(a-3599999999640)%r-(0|a/r)*r)),o=e+a),1e-6>o&&o>-1e-6&&(o=0),o},lt={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ht=function(t,e,i){return 0|255*(1>6*(t=0>t?t+1:t>1?t-1:t)?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},ut=a.parseColor=function(t){var e,i,n,r,s,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),lt[t]?lt[t]:"#"===t.charAt(0)?(4===t.length&&(t="#"+(e=t.charAt(1))+e+(i=t.charAt(2))+i+(n=t.charAt(3))+n),[(t=parseInt(t.substr(1),16))>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(v),r=Number(t[0])%360/360,s=Number(t[1])/100,e=2*(a=Number(t[2])/100)-(i=.5>=a?a*(s+1):a+s-a*s),t.length>3&&(t[3]=Number(t[3])),t[0]=ht(r+1/3,e,i),t[1]=ht(r,e,i),t[2]=ht(r-1/3,e,i),t):((t=t.match(v)||lt.transparent)[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):lt.black},pt="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(l in lt)pt+="|"+l+"\\b";pt=RegExp(pt+")","gi");var ct=function(t,e,i,n){if(null==t)return function(t){return t};var r,s=e?(t.match(pt)||[""])[0]:"",a=t.split(s).join("").match(x)||[],o=t.substr(0,t.indexOf(a[0])),l=")"===t.charAt(t.length-1)?")":"",h=-1!==t.indexOf(" ")?" ":",",u=a.length,p=u>0?a[0].replace(v,""):"";return u?r=e?function(t){var e,c,f,d;if("number"==typeof t)t+=p;else if(n&&D.test(t)){for(d=t.replace(D,"|").split("|"),f=0;d.length>f;f++)d[f]=r(d[f]);return d.join(",")}if(e=(t.match(pt)||[s])[0],f=(c=t.split(e).join("").match(x)||[]).length,u>f--)for(;u>++f;)c[f]=i?c[0|(f-1)/2]:a[f];return o+c.join(h)+h+e+l+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,s,c;if("number"==typeof t)t+=p;else if(n&&D.test(t)){for(s=t.replace(D,"|").split("|"),c=0;s.length>c;c++)s[c]=r(s[c]);return s.join(",")}if(c=(e=t.match(x)||[]).length,u>c--)for(;u>++c;)e[c]=i?e[0|(c-1)/2]:a[c];return o+e.join(h)+l}:function(t){return t}},ft=function(t){return t=t.split(","),function(e,i,n,r,s,a,o){var l,h=(i+"").split(" ");for(o={},l=0;4>l;l++)o[t[l]]=h[l]=h[l]||h[(l-1)/2>>0];return r.parse(e,o,s,a)}},dt=(j._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,n,r,s=this.data,a=s.proxy,o=s.firstMPT;o;)e=a[o.v],o.r?e=Math.round(e):1e-6>e&&e>-1e-6&&(e=0),o.t[o.p]=e,o=o._next;if(s.autoRotate&&(s.autoRotate.rotation=a.rotation),1===t)for(o=s.firstMPT;o;){if((i=o.t).type){if(1===i.type){for(r=i.xs0+i.s+i.xs1,n=1;i.l>n;n++)r+=i["xn"+n]+i["xs"+(n+1)];i.e=r}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,n,r){this.t=t,this.p=e,this.v=i,this.r=r,n&&(n._prev=this,this._next=n)}),_t=(j._parseToProxy=function(t,e,i,n,r,s){var a,o,l,h,u,p=n,c={},f={},d=i._transform,_=N;for(i._transform=null,N=e,n=u=i.parse(t,e,n,r),N=_,s&&(i._transform=d,p&&(p._prev=null,p._prev&&(p._prev._next=null)));n&&n!==p;){if(1>=n.type&&(f[o=n.p]=n.s+n.c,c[o]=n.s,s||(h=new dt(n,"s",o,h,n.r),n.c=0),1===n.type))for(a=n.l;--a>0;)l="xn"+a,f[o=n.p+"_"+l]=n.data[l],c[o]=n[l],s||(h=new dt(n,l,o,h,n.rxp[l]));n=n._next}return{proxy:c,end:f,firstMPT:h,pt:u}},j.CSSPropTween=function(t,e,n,r,a,o,l,h,u,p,c){this.t=t,this.p=e,this.s=n,this.c=r,this.n=l||e,t instanceof _t||s.push(this.n),this.r=h,this.type=o||0,u&&(this.pr=u,i=!0),this.b=void 0===p?n:p,this.e=void 0===c?n+r:c,a&&(this._next=a,a._prev=this)}),mt=a.parseComplex=function(t,e,i,n,r,s,a,o,l,u){a=new _t(t,e,0,0,a,u?2:1,null,!1,o,i=i||s||"",n),n+="";var p,c,f,d,_,m,g,x,w,T,b,P,S=i.split(", ").join(",").split(" "),k=n.split(", ").join(",").split(" "),C=S.length,A=!1!==h;for((-1!==n.indexOf(",")||-1!==i.indexOf(","))&&(S=S.join(" ").replace(D,", ").split(" "),k=k.join(" ").replace(D,", ").split(" "),C=S.length),C!==k.length&&(C=(S=(s||"").split(" ")).length),a.plugin=l,a.setRatio=u,p=0;C>p;p++)if(d=S[p],_=k[p],(x=parseFloat(d))||0===x)a.appendXtra("",x,st(_,x),_.replace(y,""),A&&-1!==_.indexOf("px"),!0);else if(r&&("#"===d.charAt(0)||lt[d]||O.test(d)))P=","===_.charAt(_.length-1)?"),":")",d=ut(d),_=ut(_),(w=d.length+_.length>6)&&!G&&0===_[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(k[p]).join("transparent")):(G||(w=!1),a.appendXtra(w?"rgba(":"rgb(",d[0],_[0]-d[0],",",!0,!0).appendXtra("",d[1],_[1]-d[1],",",!0).appendXtra("",d[2],_[2]-d[2],w?",":P,!0),w&&(d=4>d.length?1:d[3],a.appendXtra("",d,(4>_.length?1:_[3])-d,P,!1)));else if(m=d.match(v)){if(!(g=_.match(y))||g.length!==m.length)return a;for(f=0,c=0;m.length>c;c++)b=m[c],T=d.indexOf(b,f),a.appendXtra(d.substr(f,T-f),Number(b),st(g[c],b),"",A&&"px"===d.substr(T+b.length,2),0===c),f=T+b.length;a["xs"+a.l]+=d.substr(f)}else a["xs"+a.l]+=a.l?" "+d:d;if(-1!==n.indexOf("=")&&a.data){for(P=a.xs0+a.data.s,p=1;a.l>p;p++)P+=a["xs"+p]+a.data["xn"+p];a.e=P+a["xs"+p]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},gt=9;for((l=_t.prototype).l=l.pr=0;--gt>0;)l["xn"+gt]=0,l["xs"+gt]="";l.xs0="",l._next=l._prev=l.xfirst=l.data=l.plugin=l.setRatio=l.rxp=null,l.appendXtra=function(t,e,i,n,r,s){var a=this,o=a.l;return a["xs"+o]+=s&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=n||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=r,a["xn"+o]=e,a.plugin||(a.xfirst=new _t(a,"xn"+o,e,i,a.xfirst||a,0,a.n,r,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=r,a)):(a["xs"+o]+=e+(n||""),a)};var vt=function(t,e){e=e||{},this.p=e.prefix&&Q(t)||t,o[t]=o[this.p]=this,this.format=e.formatter||ct(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},yt=j._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var n,r=t.split(","),s=e.defaultValue;for(i=i||[s],n=0;r.length>n;n++)e.prefix=0===n&&e.prefix,e.defaultValue=i[n]||s,new vt(r[n],e)},xt=function(t){if(!o[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";yt(t,{parser:function(t,i,n,r,s,a,l){var h=(_gsScope.GreenSockGlobals||_gsScope).com.greensock.plugins[e];return h?(h._cssRegister(),o[n].parse(t,i,n,r,s,a,l)):(V("Error: "+e+" js file not loaded."),s)}})}};(l=vt.prototype).parseComplex=function(t,e,i,n,r,s){var a,o,l,h,u,p=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),l=i.replace(D,"|").split("|")):p&&(o=[e],l=[i])),l){for(h=l.length>o.length?l.length:o.length,a=0;h>a;a++)e=o[a]=o[a]||this.dflt,i=l[a]=l[a]||this.dflt,p&&(e.indexOf(p)!==(u=i.indexOf(p))&&((i=-1===u?l:o)[a]+=" "+p));e=o.join(", "),i=l.join(", ")}return mt(t,this.p,e,i,this.clrs,this.dflt,n,this.pr,r,s)},l.parse=function(t,e,i,n,s,a){return this.parseComplex(t.style,this.format(Z(t,this.p,r,!1,this.dflt)),this.format(e),s,a)},a.registerSpecialProp=function(t,e,i){yt(t,{parser:function(t,n,r,s,a,o){var l=new _t(t,r,0,0,a,2,r,!1,i);return l.plugin=o,l.setRatio=e(t,n,s._tween,r),l},priority:i})};var wt,Tt,bt,Pt,St,Ot="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),kt=Q("transform"),Ct=W+"transform",At=Q("transformOrigin"),Rt=null!==Q("perspective"),Mt=j.Transform=function(){this.skewY=0},Et=window.SVGElement,Lt=function(t,e,i){var n,r=z.createElementNS("http://www.w3.org/2000/svg",t),s=/([a-z])([A-Z])/g;for(n in i)r.setAttributeNS(null,n.replace(s,"$1-$2").toLowerCase(),i[n]);return e.appendChild(r),r},Dt=document.documentElement,It=(St=d||/Android/i.test(B)&&!window.chrome,z.createElementNS&&!St&&(Tt=Lt("svg",Dt),Pt=(bt=Lt("rect",Tt,{width:100,height:50,x:100})).getBoundingClientRect().left,bt.style[At]="50% 50%",bt.style[kt]="scale(0.5,0.5)",St=Pt===bt.getBoundingClientRect().left,Dt.removeChild(Tt)),St),Xt=function(t,e,i){var n=t.getBBox();e=rt(e).split(" "),i.xOrigin=(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*n.width:parseFloat(e[0]))+n.x,i.yOrigin=(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*n.height:parseFloat(e[1]))+n.y},Nt=j.getTransform=function(t,e,i,n){if(t._gsTransform&&i&&!n)return t._gsTransform;var s,o,l,h,u,p,c,f,d,_,m,g,v,y=i&&t._gsTransform||new Mt,x=0>y.scaleX,w=2e-5,T=1e5,b=179.99,P=b*I,S=Rt&&(parseFloat(Z(t,At,e,!1,"0 0 0").split(" ")[2])||y.zOrigin)||0,O=parseFloat(a.defaultTransformPerspective)||0;if(kt?s=Z(t,Ct,e,!0):t.currentStyle&&(s=(s=t.currentStyle.filter.match(E))&&4===s.length?[s[0].substr(4),Number(s[2].substr(4)),Number(s[1].substr(4)),s[3].substr(4),y.x||0,y.y||0].join(","):""),s&&"none"!==s&&"matrix(1, 0, 0, 1, 0, 0)"!==s){for(l=(o=(s||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[]).length;--l>-1;)h=Number(o[l]),o[l]=(u=h-(h|=0))?(0|u*T+(0>u?-.5:.5))/T+h:h;if(16===o.length){var k=o[8],C=o[9],A=o[10],R=o[12],M=o[13],L=o[14];if(y.zOrigin&&(R=k*(L=-y.zOrigin)-o[12],M=C*L-o[13],L=A*L+y.zOrigin-o[14]),!i||n||null==y.rotationX){var D,N,z,F,Y,j,B,G=o[0],U=o[1],V=o[2],W=o[3],H=o[4],Q=o[5],q=o[6],$=o[7],K=o[11],J=Math.atan2(q,A),tt=-P>J||J>P;y.rotationX=J*X,J&&(D=H*(F=Math.cos(-J))+k*(Y=Math.sin(-J)),N=Q*F+C*Y,z=q*F+A*Y,k=H*-Y+k*F,C=Q*-Y+C*F,A=q*-Y+A*F,K=$*-Y+K*F,H=D,Q=N,q=z),J=Math.atan2(k,G),y.rotationY=J*X,J&&(j=-P>J||J>P,N=U*(F=Math.cos(-J))-C*(Y=Math.sin(-J)),z=V*F-A*Y,C=U*Y+C*F,A=V*Y+A*F,K=W*Y+K*F,G=D=G*F-k*Y,U=N,V=z),J=Math.atan2(U,Q),y.rotation=J*X,J&&(B=-P>J||J>P,G=G*(F=Math.cos(-J))+H*(Y=Math.sin(-J)),N=U*F+Q*Y,Q=U*-Y+Q*F,q=V*-Y+q*F,U=N),B&&tt?y.rotation=y.rotationX=0:B&&j?y.rotation=y.rotationY=0:j&&tt&&(y.rotationY=y.rotationX=0),y.scaleX=(0|Math.sqrt(G*G+U*U)*T+.5)/T,y.scaleY=(0|Math.sqrt(Q*Q+C*C)*T+.5)/T,y.scaleZ=(0|Math.sqrt(q*q+A*A)*T+.5)/T,y.skewX=0,y.perspective=K?1/(0>K?-K:K):0,y.x=R,y.y=M,y.z=L}}else if(!(Rt&&!n&&o.length&&y.x===o[4]&&y.y===o[5]&&(y.rotationX||y.rotationY)||void 0!==y.x&&"none"===Z(t,"display",e))){var et=o.length>=6,it=et?o[0]:1,nt=o[1]||0,rt=o[2]||0,st=et?o[3]:1;y.x=o[4]||0,y.y=o[5]||0,p=Math.sqrt(it*it+nt*nt),c=Math.sqrt(st*st+rt*rt),f=it||nt?Math.atan2(nt,it)*X:y.rotation||0,d=rt||st?Math.atan2(rt,st)*X+f:y.skewX||0,_=p-Math.abs(y.scaleX||0),m=c-Math.abs(y.scaleY||0),Math.abs(d)>90&&270>Math.abs(d)&&(x?(p*=-1,d+=0>=f?180:-180,f+=0>=f?180:-180):(c*=-1,d+=0>=d?180:-180)),g=(f-y.rotation)%180,v=(d-y.skewX)%180,(void 0===y.skewX||_>w||-w>_||m>w||-w>m||g>-b&&b>g&&!1|g*T||v>-b&&b>v&&!1|v*T)&&(y.scaleX=p,y.scaleY=c,y.rotation=f,y.skewX=d),Rt&&(y.rotationX=y.rotationY=y.z=0,y.perspective=O,y.scaleZ=1)}for(l in y.zOrigin=S,y)w>y[l]&&y[l]>-w&&(y[l]=0)}else y={x:0,y:0,z:0,scaleX:1,scaleY:1,scaleZ:1,skewX:0,skewY:0,perspective:O,rotation:0,rotationX:0,rotationY:0,zOrigin:0};return i&&(t._gsTransform=y),y.svg=Et&&t instanceof Et&&t.parentNode instanceof Et,y.svg&&(Xt(t,Z(t,At,r,!1,"50% 50%")+"",y),wt=a.useSVGTransformAttr||It),y.xPercent=y.yPercent=0,y},zt=function(t){var e,i,n=this.data,r=-n.rotation*I,s=r+n.skewX*I,a=1e5,o=(0|Math.cos(r)*n.scaleX*a)/a,l=(0|Math.sin(r)*n.scaleX*a)/a,h=(0|Math.sin(s)*-n.scaleY*a)/a,u=(0|Math.cos(s)*n.scaleY*a)/a,p=this.t.style,c=this.t.currentStyle;if(c){i=l,l=-h,h=-i,e=c.filter,p.filter="";var f,_,m=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==c.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+l+", M21="+h+", M22="+u,x=n.x+m*n.xPercent/100,w=n.y+g*n.yPercent/100;if(null!=n.ox&&(x+=(f=(n.oxp?.01*m*n.ox:n.ox)-m/2)-(f*o+(_=(n.oyp?.01*g*n.oy:n.oy)-g/2)*l),w+=_-(f*h+_*u)),v?y+=", Dx="+((f=m/2)-(f*o+(_=g/2)*l)+x)+", Dy="+(_-(f*h+_*u)+w)+")":y+=", sizingMethod='auto expand')",p.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(L,y):y+" "+e,(0===t||1===t)&&1===o&&0===l&&0===h&&1===u&&(v&&-1===y.indexOf("Dx=0, Dy=0")||b.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf(e.indexOf("Alpha"))&&p.removeAttribute("filter")),!v){var P,S,O,k=8>d?1:-1;for(f=n.ieOffsetX||0,_=n.ieOffsetY||0,n.ieOffsetX=Math.round((m-((0>o?-o:o)*m+(0>l?-l:l)*g))/2+x),n.ieOffsetY=Math.round((g-((0>u?-u:u)*g+(0>h?-h:h)*m))/2+w),gt=0;4>gt;gt++)O=(i=-1!==(P=c[S=it[gt]]).indexOf("px")?parseFloat(P):$(this.t,S,parseFloat(P),P.replace(T,""))||0)!==n[S]?2>gt?-n.ieOffsetX:-n.ieOffsetY:2>gt?f-n.ieOffsetX:_-n.ieOffsetY,p[S]=(n[S]=Math.round(i-O*(0===gt||2===gt?1:k)))+"px"}}},Ft=j.set3DTransformRatio=function(t){var e,i,n,r,s,a,o,l,h,u,p,f,d,_,m,g,v,y,x,w,T,b,P,S=this.data,O=this.t.style,k=S.rotation*I,C=S.scaleX,A=S.scaleY,R=S.scaleZ,M=S.x,E=S.y,L=S.z,D=S.perspective;if(1!==t&&0!==t||"auto"!==S.force3D||S.rotationY||S.rotationX||1!==R||D||L){if(c){1e-4>C&&C>-1e-4&&(C=R=2e-5),1e-4>A&&A>-1e-4&&(A=R=2e-5),!D||S.z||S.rotationX||S.rotationY||(D=0)}if(k||S.skewX)e=y=Math.cos(k),s=x=Math.sin(k),S.skewX&&(k-=S.skewX*I,y=Math.cos(k),x=Math.sin(k),"simple"===S.skewType&&(w=Math.tan(S.skewX*I),y*=w=Math.sqrt(1+w*w),x*=w)),i=-x,a=y;else{if(!(S.rotationY||S.rotationX||1!==R||D||S.svg))return void(O[kt]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) translate3d(":"translate3d(")+M+"px,"+E+"px,"+L+"px)"+(1!==C||1!==A?" scale("+C+","+A+")":""));e=a=1,i=s=0}p=1,n=r=o=l=h=u=f=d=_=0,m=D?-1/D:0,g=S.zOrigin,v=1e5,(k=S.rotationY*I)&&(y=Math.cos(k),h=p*-(x=Math.sin(k)),d=m*-x,n=e*x,o=s*x,p*=y,m*=y,e*=y,s*=y),(k=S.rotationX*I)&&(w=i*(y=Math.cos(k))+n*(x=Math.sin(k)),T=a*y+o*x,b=u*y+p*x,P=_*y+m*x,n=i*-x+n*y,o=a*-x+o*y,p=u*-x+p*y,m=_*-x+m*y,i=w,a=T,u=b,_=P),1!==R&&(n*=R,o*=R,p*=R,m*=R),1!==A&&(i*=A,a*=A,u*=A,_*=A),1!==C&&(e*=C,s*=C,h*=C,d*=C),g&&(r=n*(f-=g),l=o*f,f=p*f+g),S.svg&&(r+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),l+=S.yOrigin-(S.xOrigin*s+S.yOrigin*a)),r=(w=(r+=M)-(r|=0))?(0|w*v+(0>w?-.5:.5))/v+r:r,l=(w=(l+=E)-(l|=0))?(0|w*v+(0>w?-.5:.5))/v+l:l,f=(w=(f+=L)-(f|=0))?(0|w*v+(0>w?-.5:.5))/v+f:f,O[kt]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix3d(":"matrix3d(")+[(0|e*v)/v,(0|s*v)/v,(0|h*v)/v,(0|d*v)/v,(0|i*v)/v,(0|a*v)/v,(0|u*v)/v,(0|_*v)/v,(0|n*v)/v,(0|o*v)/v,(0|p*v)/v,(0|m*v)/v,r,l,f,D?1+-f/D:1].join(",")+")"}else Yt.call(this,t)},Yt=j.set2DTransformRatio=function(t){var e,i,n,r,s,a,o,l,h,u,p=this.data,c=this.t,f=c.style,d=p.x,_=p.y;return!(p.rotationX||p.rotationY||p.z||!0===p.force3D||"auto"===p.force3D&&1!==t&&0!==t)||p.svg&&wt||!Rt?(r=p.scaleX,s=p.scaleY,void(p.rotation||p.skewX||p.svg?(e=p.rotation*I,i=e-p.skewX*I,n=1e5,a=Math.cos(e)*r,o=Math.sin(e)*r,l=Math.sin(i)*-s,h=Math.cos(i)*s,p.svg&&(d+=p.xOrigin-(p.xOrigin*a+p.yOrigin*l),_+=p.yOrigin-(p.xOrigin*o+p.yOrigin*h),1e-6,1e-6>d&&d>-1e-6&&(d=0),1e-6>_&&_>-1e-6&&(_=0)),u=(0|a*n)/n+","+(0|o*n)/n+","+(0|l*n)/n+","+(0|h*n)/n+","+d+","+_+")",p.svg&&wt?c.setAttribute("transform","matrix("+u):f[kt]=(p.xPercent||p.yPercent?"translate("+p.xPercent+"%,"+p.yPercent+"%) matrix(":"matrix(")+u):f[kt]=(p.xPercent||p.yPercent?"translate("+p.xPercent+"%,"+p.yPercent+"%) matrix(":"matrix(")+r+",0,0,"+s+","+d+","+_+")")):(this.setRatio=Ft,void Ft.call(this,t))};yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(t,e,i,n,s,o,l){if(n._transform)return s;var h,u,p,c,f,d,_,m=n._transform=Nt(t,r,!0,l.parseTransform),g=t.style,v=Ot.length,y=l,x={};if("string"==typeof y.transform&&kt)(p=F.style)[kt]=y.transform,p.display="block",p.position="absolute",z.body.appendChild(F),h=Nt(F,null,!1),z.body.removeChild(F);else if("object"==typeof y){if(h={scaleX:at(null!=y.scaleX?y.scaleX:y.scale,m.scaleX),scaleY:at(null!=y.scaleY?y.scaleY:y.scale,m.scaleY),scaleZ:at(y.scaleZ,m.scaleZ),x:at(y.x,m.x),y:at(y.y,m.y),z:at(y.z,m.z),xPercent:at(y.xPercent,m.xPercent),yPercent:at(y.yPercent,m.yPercent),perspective:at(y.transformPerspective,m.perspective)},null!=(_=y.directionalRotation))if("object"==typeof _)for(p in _)y[p]=_[p];else y.rotation=_;"string"==typeof y.x&&-1!==y.x.indexOf("%")&&(h.x=0,h.xPercent=at(y.x,m.xPercent)),"string"==typeof y.y&&-1!==y.y.indexOf("%")&&(h.y=0,h.yPercent=at(y.y,m.yPercent)),h.rotation=ot("rotation"in y?y.rotation:"shortRotation"in y?y.shortRotation+"_short":"rotationZ"in y?y.rotationZ:m.rotation,m.rotation,"rotation",x),Rt&&(h.rotationX=ot("rotationX"in y?y.rotationX:"shortRotationX"in y?y.shortRotationX+"_short":m.rotationX||0,m.rotationX,"rotationX",x),h.rotationY=ot("rotationY"in y?y.rotationY:"shortRotationY"in y?y.shortRotationY+"_short":m.rotationY||0,m.rotationY,"rotationY",x)),h.skewX=null==y.skewX?m.skewX:ot(y.skewX,m.skewX),h.skewY=null==y.skewY?m.skewY:ot(y.skewY,m.skewY),(u=h.skewY-m.skewY)&&(h.skewX+=u,h.rotation+=u)}for(Rt&&null!=y.force3D&&(m.force3D=y.force3D,d=!0),m.skewType=y.skewType||m.skewType||a.defaultSkewType,(f=m.force3D||m.z||m.rotationX||m.rotationY||h.z||h.rotationX||h.rotationY||h.perspective)||null==y.scale||(h.scaleZ=1);--v>-1;)((c=h[i=Ot[v]]-m[i])>1e-6||-1e-6>c||null!=y[i]||null!=N[i])&&(d=!0,s=new _t(m,i,m[i],c,s),i in x&&(s.e=x[i]),s.xs0=0,s.plugin=o,n._overwriteProps.push(s.n));return(c=y.transformOrigin)&&m.svg&&(Xt(t,c,h),(s=new _t(m,"xOrigin",m.xOrigin,h.xOrigin-m.xOrigin,s,-1,"transformOrigin")).b=m.xOrigin,s.e=s.xs0=h.xOrigin,(s=new _t(m,"yOrigin",m.yOrigin,h.yOrigin-m.yOrigin,s,-1,"transformOrigin")).b=m.yOrigin,s.e=s.xs0=h.yOrigin,c="0px 0px"),(c||Rt&&f&&m.zOrigin)&&(kt?(d=!0,i=At,c=(c||Z(t,i,r,!1,"50% 50%"))+"",(s=new _t(g,i,0,0,s,-1,"transformOrigin")).b=g[i],s.plugin=o,Rt?(p=m.zOrigin,c=c.split(" "),m.zOrigin=(c.length>2&&(0===p||"0px"!==c[2])?parseFloat(c[2]):p)||0,s.xs0=s.e=c[0]+" "+(c[1]||"50%")+" 0px",(s=new _t(m,"zOrigin",0,0,s,-1,s.n)).b=p,s.xs0=s.e=m.zOrigin):s.xs0=s.e=c):rt(c+"",m)),d&&(n._transformType=m.svg&&wt||!f&&3!==this._transformType?2:3),s},prefix:!0}),yt("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),yt("borderRadius",{defaultValue:"0px",parser:function(t,e,i,s,a){e=this.format(e);var o,l,h,u,p,c,f,d,_,m,g,v,y,x,w,T,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(_=parseFloat(t.offsetWidth),m=parseFloat(t.offsetHeight),o=e.split(" "),l=0;b.length>l;l++)this.p.indexOf("border")&&(b[l]=Q(b[l])),-1!==(p=u=Z(t,b[l],r,!1,"0px")).indexOf(" ")&&(p=(u=p.split(" "))[0],u=u[1]),c=h=o[l],f=parseFloat(p),v=p.substr((f+"").length),(y="="===c.charAt(1))?(d=parseInt(c.charAt(0)+"1",10),c=c.substr(2),d*=parseFloat(c),g=c.substr((d+"").length-(0>d?1:0))||""):(d=parseFloat(c),g=c.substr((d+"").length)),""===g&&(g=n[i]||v),g!==v&&(x=$(t,"borderLeft",f,v),w=$(t,"borderTop",f,v),"%"===g?(p=x/_*100+"%",u=w/m*100+"%"):"em"===g?(p=x/(T=$(t,"borderLeft",1,"em"))+"em",u=w/T+"em"):(p=x+"px",u=w+"px"),y&&(c=parseFloat(p)+d+g,h=parseFloat(u)+d+g)),a=mt(P,b[l],p+" "+u,c+" "+h,!1,"0px",a);return a},prefix:!0,formatter:ct("0px 0px 0px 0px",!1,!0)}),yt("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,n,s,a){var o,l,h,u,p,c,f="background-position",_=r||q(t,null),m=this.format((_?d?_.getPropertyValue(f+"-x")+" "+_.getPropertyValue(f+"-y"):_.getPropertyValue(f):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==m.indexOf("%")!=(-1!==g.indexOf("%"))&&((c=Z(t,"backgroundImage").replace(A,""))&&"none"!==c)){for(o=m.split(" "),l=g.split(" "),Y.setAttribute("src",c),h=2;--h>-1;)(u=-1!==(m=o[h]).indexOf("%"))!==(-1!==l[h].indexOf("%"))&&(p=0===h?t.offsetWidth-Y.width:t.offsetHeight-Y.height,o[h]=u?parseFloat(m)/100*p+"px":parseFloat(m)/p*100+"%");m=o.join(" ")}return this.parseComplex(t.style,m,g,s,a)},formatter:rt}),yt("backgroundSize",{defaultValue:"0 0",formatter:rt}),yt("perspective",{defaultValue:"0px",prefix:!0}),yt("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),yt("transformStyle",{prefix:!0}),yt("backfaceVisibility",{prefix:!0}),yt("userSelect",{prefix:!0}),yt("margin",{parser:ft("marginTop,marginRight,marginBottom,marginLeft")}),yt("padding",{parser:ft("paddingTop,paddingRight,paddingBottom,paddingLeft")}),yt("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,n,s,a){var o,l,h;return 9>d?(l=t.currentStyle,h=8>d?" ":",",o="rect("+l.clipTop+h+l.clipRight+h+l.clipBottom+h+l.clipLeft+")",e=this.format(e).split(",").join(h)):(o=this.format(Z(t,this.p,r,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,s,a)}}),yt("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),yt("autoRound,strictUnits",{parser:function(t,e,i,n,r){return r}}),yt("border",{defaultValue:"0px solid #000",parser:function(t,e,i,n,s,a){return this.parseComplex(t.style,this.format(Z(t,"borderTopWidth",r,!1,"0px")+" "+Z(t,"borderTopStyle",r,!1,"solid")+" "+Z(t,"borderTopColor",r,!1,"#000")),this.format(e),s,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(pt)||["#000"])[0]}}),yt("borderWidth",{parser:ft("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),yt("float,cssFloat,styleFloat",{parser:function(t,e,i,n,r){var s=t.style,a="cssFloat"in s?"cssFloat":"styleFloat";return new _t(s,a,0,0,r,-1,i,!1,0,s[a],e)}});var jt=function(t){var e,i=this.t,n=i.filter||Z(this.data,"filter")||"",r=0|this.s+this.c*t;100===r&&(-1===n.indexOf("atrix(")&&-1===n.indexOf("radient(")&&-1===n.indexOf("oader(")?(i.removeAttribute("filter"),e=!Z(this.data,"filter")):(i.filter=n.replace(S,""),e=!0)),e||(this.xn1&&(i.filter=n=n||"alpha(opacity="+r+")"),-1===n.indexOf("pacity")?0===r&&this.xn1||(i.filter=n+" alpha(opacity="+r+")"):i.filter=n.replace(b,"opacity="+r))};yt("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,n,s,a){var o=parseFloat(Z(t,"opacity",r,!1,"1")),l=t.style,h="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),h&&1===o&&"hidden"===Z(t,"visibility",r)&&0!==e&&(o=0),G?s=new _t(l,"opacity",o,e-o,s):((s=new _t(l,"opacity",100*o,100*(e-o),s)).xn1=h?1:0,l.zoom=1,s.type=2,s.b="alpha(opacity="+s.s+")",s.e="alpha(opacity="+(s.s+s.c)+")",s.data=t,s.plugin=a,s.setRatio=jt),h&&((s=new _t(l,"visibility",0,0,s,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit")).xs0="inherit",n._overwriteProps.push(s.n),n._overwriteProps.push(i)),s}});var Bt=function(t,e){e&&(t.removeProperty?("ms"===e.substr(0,2)&&(e="M"+e.substr(1)),t.removeProperty(e.replace(k,"-$1").toLowerCase())):t.removeAttribute(e))},Gt=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Bt(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};yt("className",{parser:function(t,e,n,s,a,o,l){var h,u,p,c,f,d=t.getAttribute("class")||"",_=t.style.cssText;if((a=s._classNamePT=new _t(t,n,0,0,a,2)).setRatio=Gt,a.pr=-11,i=!0,a.b=d,u=J(t,r),p=t._gsClassPT){for(c={},f=p.data;f;)c[f.p]=1,f=f._next;p.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:d.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),s._tween._duration&&(t.setAttribute("class",a.e),h=tt(t,u,J(t),l,c),t.setAttribute("class",d),a.data=h.firstMPT,t.style.cssText=_,a=a.xfirst=s.parse(t,h.difs,a,o)),a}});var Ut=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,n,r,s=this.t.style,a=o.transform.parse;if("all"===this.e)s.cssText="",r=!0;else for(n=(e=this.e.split(" ").join("").split(",")).length;--n>-1;)i=e[n],o[i]&&(o[i].parse===a?r=!0:i="transformOrigin"===i?At:o[i].p),Bt(s,i);r&&(Bt(s,kt),this.t._gsTransform&&delete this.t._gsTransform)}};for(yt("clearProps",{parser:function(t,e,n,r,s){return(s=new _t(t,n,0,0,s,2)).setRatio=Ut,s.e=e,s.pr=-10,s.data=r._tween,i=!0,s}}),l="bezier,throwProps,physicsProps,physics2D".split(","),gt=l.length;gt--;)xt(l[gt]);(l=a.prototype)._firstPT=null,l._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,h=e.autoRound,i=!1,n=e.suffixMap||a.suffixMap,r=q(t,""),s=this._overwriteProps;var l,c,d,_,m,g,v,y,x,w=t.style;if(u&&""===w.zIndex&&(("auto"===(l=Z(t,"zIndex",r))||""===l)&&this._addLazySet(w,"zIndex",0)),"string"==typeof e&&(_=w.cssText,l=J(t,r),w.cssText=_+";"+e,l=tt(t,l,J(t)).difs,!G&&P.test(e)&&(l.opacity=parseFloat(RegExp.$1)),e=l,w.cssText=_),this._firstPT=c=this.parse(t,e,null),this._transformType){for(x=3===this._transformType,kt?p&&(u=!0,""===w.zIndex&&(("auto"===(v=Z(t,"zIndex",r))||""===v)&&this._addLazySet(w,"zIndex",0)),f&&this._addLazySet(w,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(x?"visible":"hidden"))):w.zoom=1,d=c;d&&d._next;)d=d._next;y=new _t(t,"transform",0,0,null,2),this._linkCSSP(y,null,d),y.setRatio=x&&Rt?Ft:kt?Yt:zt,y.data=this._transform||Nt(t,r,!0),s.pop()}if(i){for(;c;){for(g=c._next,d=_;d&&d.pr>c.pr;)d=d._next;(c._prev=d?d._prev:m)?c._prev._next=c:_=c,(c._next=d)?d._prev=c:m=c,c=g}this._firstPT=_}return!0},l.parse=function(t,e,i,s){var a,l,u,p,c,f,d,_,m,g,v=t.style;for(a in e)f=e[a],(l=o[a])?i=l.parse(t,f,a,this,i,s,e):(c=Z(t,a,r)+"",m="string"==typeof f,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||m&&O.test(f)?(m||(f=((f=ut(f)).length>3?"rgba(":"rgb(")+f.join(",")+")"),i=mt(v,a,c,f,!0,"transparent",i,0,s)):!m||-1===f.indexOf(" ")&&-1===f.indexOf(",")?(d=(u=parseFloat(c))||0===u?c.substr((u+"").length):"",(""===c||"auto"===c)&&("width"===a||"height"===a?(u=nt(t,a,r),d="px"):"left"===a||"top"===a?(u=K(t,a,r),d="px"):(u="opacity"!==a?0:1,d="")),(g=m&&"="===f.charAt(1))?(p=parseInt(f.charAt(0)+"1",10),f=f.substr(2),p*=parseFloat(f),_=f.replace(T,"")):(p=parseFloat(f),_=m&&f.substr((p+"").length)||""),""===_&&(_=a in n?n[a]:d),f=p||0===p?(g?p+u:p)+_:e[a],d!==_&&""!==_&&(p||0===p)&&u&&(u=$(t,a,u,d),"%"===_?(u/=$(t,a,100,"%")/100,!0!==e.strictUnits&&(c=u+"%")):"em"===_?u/=$(t,a,1,"em"):"px"!==_&&(p=$(t,a,p,_),_="px"),g&&(p||0===p)&&(f=p+u+_)),g&&(p+=u),!u&&0!==u||!p&&0!==p?void 0!==v[a]&&(f||"NaN"!=f+""&&null!=f)?(i=new _t(v,a,p||u||0,0,i,-1,a,!1,0,c,f)).xs0="none"!==f||"display"!==a&&-1===a.indexOf("Style")?f:c:V("invalid "+a+" tween value: "+e[a]):(i=new _t(v,a,u,p-u,i,0,a,!1!==h&&("px"===_||"zIndex"===a),0,c,f)).xs0=_):i=mt(v,a,c,f,!0,null,i,0,s)),s&&i&&!i.plugin&&(i.plugin=s);return i},l.setRatio=function(t){var e,i,n,r=this._firstPT;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||-1e-6===this._tween._rawPrevTime)for(;r;){if(e=r.c*t+r.s,r.r?e=Math.round(e):1e-6>e&&e>-1e-6&&(e=0),r.type)if(1===r.type)if(2===(n=r.l))r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2;else if(3===n)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3;else if(4===n)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4;else if(5===n)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4+r.xn4+r.xs5;else{for(i=r.xs0+e+r.xs1,n=1;r.l>n;n++)i+=r["xn"+n]+r["xs"+(n+1)];r.t[r.p]=i}else-1===r.type?r.t[r.p]=r.xs0:r.setRatio&&r.setRatio(t);else r.t[r.p]=e+r.xs0;r=r._next}else for(;r;)2!==r.type?r.t[r.p]=r.b:r.setRatio(t),r=r._next;else for(;r;)2!==r.type?r.t[r.p]=r.e:r.setRatio(t),r=r._next},l._enableTransforms=function(t){this._transform=this._transform||Nt(this._target,r,!0),this._transformType=this._transform.svg&&wt||!t&&3!==this._transformType?2:3};var Vt=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};l._addLazySet=function(t,e,i){var n=this._firstPT=new _t(t,e,0,0,this._firstPT,2);n.e=i,n.setRatio=Vt,n.data=this},l._linkCSSP=function(t,e,i,n){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,n=!0),i?i._next=t:n||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},l._kill=function(e){var i,n,r,s=e;if(e.autoAlpha||e.alpha){for(n in s={},e)s[n]=e[n];s.opacity=1,s.autoAlpha&&(s.visibility=1)}return e.className&&(i=this._classNamePT)&&((r=i.xfirst)&&r._prev?this._linkCSSP(r._prev,i._next,r._prev._prev):r===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,r._prev),this._classNamePT=null),t.prototype._kill.call(this,s)};var Wt=function(t,e,i){var n,r,s,a;if(t.slice)for(r=t.length;--r>-1;)Wt(t[r],e,i);else for(r=(n=t.childNodes).length;--r>-1;)a=(s=n[r]).type,s.style&&(e.push(J(s)),i&&i.push(s)),1!==a&&9!==a&&11!==a||!s.childNodes.length||Wt(s,e,i)};return a.cascadeTo=function(t,i,n){var r,s,a,o=e.to(t,i,n),l=[o],h=[],u=[],p=[],c=e._internals.reservedProps;for(t=o._targets||o.target,Wt(t,h,p),o.render(i,!0),Wt(t,u),o.render(0,!0),o._enabled(!0),r=p.length;--r>-1;)if((s=tt(p[r],h[r],u[r])).firstMPT){for(a in s=s.difs,n)c[a]&&(s[a]=n[a]);l.push(e.to(p[r],i,s))}return l},t.activate([a]),a},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope).CSSPlugin};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=e())}(),function(t){"use strict";var e=t.GreenSockGlobals||t,i=function(t){var i,n=t.split("."),r=e;for(i=0;n.length>i;i++)r[n[i]]=r=r[n[i]]||{};return r}("com.greensock.utils"),n=function(t){var e=t.nodeType,i="";if(1===e||9===e||11===e){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)i+=n(t)}else if(3===e||4===e)return t.nodeValue;return i},r=document,s=r.defaultView?r.defaultView.getComputedStyle:function(){},a=/([A-Z])/g,o=function(t,e,i,n){var r;return(i=i||s(t,null))?r=(t=i.getPropertyValue(e.replace(a,"-$1").toLowerCase()))||i.length?t:i[e]:t.currentStyle&&(r=(i=t.currentStyle)[e]),n?r:parseInt(r,10)||0},l=function(t){return!!(t.length&&t[0]&&(t[0].nodeType&&t[0].style&&!t.nodeType||t[0].length&&t[0][0]))},h=")eefec303079ad17405c",u=/(?:<br>|<br\/>|<br \/>)/gi,p="<div style='position:relative;display:inline-block;"+(r.all&&!r.addEventListener?"*display:inline;*zoom:1;'":"'"),c=function(t){var e=-1!==(t=t||"").indexOf("++"),i=1;return e&&(t=t.split("++").join("")),function(){return p+(t?" class='"+t+(e?i++:"")+"'>":">")}},f=i.SplitText=e.SplitText=function(t,e){if("string"==typeof t&&(t=f.selector(t)),!t)throw"cannot split a null element.";this.elements=l(t)?function(t){var e,i,n,r=[],s=t.length;for(e=0;s>e;e++)if(i=t[e],l(i))for(n=i.length,n=0;i.length>n;n++)r.push(i[n]);else r.push(i);return r}(t):[t],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=e||{},this.split(e)},d=function(t,e,i){var n=t.nodeType;if(1===n||9===n||11===n)for(t=t.firstChild;t;t=t.nextSibling)d(t,e,i);else(3===n||4===n)&&(t.nodeValue=t.nodeValue.split(e).join(i))},_=function(t,e){for(var i=e.length;--i>-1;)t.push(e[i])},m=function(t,e,i,a,l){u.test(t.innerHTML)&&(t.innerHTML=t.innerHTML.replace(u,h));var p,f,m,g,v,y,x,w,T,b,P,S,O,k,C=n(t),A=e.type||e.split||"chars,words,lines",R=-1!==A.indexOf("lines")?[]:null,M=-1!==A.indexOf("words"),E=-1!==A.indexOf("chars"),L="absolute"===e.position||!0===e.absolute,D=L?"&#173; ":" ",I=-999,X=s(t),N=o(t,"paddingLeft",X),z=o(t,"borderBottomWidth",X)+o(t,"borderTopWidth",X),F=o(t,"borderLeftWidth",X)+o(t,"borderRightWidth",X),Y=o(t,"paddingTop",X)+o(t,"paddingBottom",X),j=o(t,"paddingLeft",X)+o(t,"paddingRight",X),B=o(t,"textAlign",X,!0),G=t.clientHeight,U=t.clientWidth,V="</div>",W=c(e.wordsClass),H=c(e.charsClass),Q=-1!==(e.linesClass||"").indexOf("++"),q=e.linesClass,Z=-1!==C.indexOf("<"),$=!0,K=[],J=[],tt=[];for(Q&&(q=q.split("++").join("")),Z&&(C=C.split("<").join("{{LT}}")),p=C.length,g=W(),v=0;p>v;v++)if(")"===(x=C.charAt(v))&&C.substr(v,20)===h)g+=($?V:"")+"<BR/>",$=!1,v!==p-20&&C.substr(v+20,20)!==h&&(g+=" "+W(),$=!0),v+=19;else if(" "===x&&" "!==C.charAt(v-1)&&v!==p-1&&C.substr(v-20,20)!==h){for(g+=$?V:"",$=!1;" "===C.charAt(v+1);)g+=D,v++;(")"!==C.charAt(v+1)||C.substr(v+1,20)!==h)&&(g+=D+W(),$=!0)}else g+=E&&" "!==x?H()+x+"</div>":x;for(t.innerHTML=g+($?V:""),Z&&d(t,"{{LT}}","<"),p=(y=t.getElementsByTagName("*")).length,w=[],v=0;p>v;v++)w[v]=y[v];if(R||L)for(v=0;p>v;v++)((m=(T=w[v]).parentNode===t)||L||E&&!M)&&(b=T.offsetTop,R&&m&&b!==I&&"BR"!==T.nodeName&&(f=[],R.push(f),I=b),L&&(T._x=T.offsetLeft,T._y=b,T._w=T.offsetWidth,T._h=T.offsetHeight),R&&(M!==m&&E||(f.push(T),T._x-=N),m&&v&&(w[v-1]._wordEnd=!0),"BR"===T.nodeName&&T.nextSibling&&"BR"===T.nextSibling.nodeName&&R.push([])));for(v=0;p>v;v++)m=(T=w[v]).parentNode===t,"BR"!==T.nodeName?(L&&(S=T.style,M||m||(T._x+=T.parentNode._x,T._y+=T.parentNode._y),S.left=T._x+"px",S.top=T._y+"px",S.position="absolute",S.display="block",S.width=T._w+1+"px",S.height=T._h+"px"),M?m&&""!==T.innerHTML?J.push(T):E&&K.push(T):m?(t.removeChild(T),w.splice(v--,1),p--):!m&&E&&(b=!R&&!L&&T.nextSibling,t.appendChild(T),b||t.appendChild(r.createTextNode(" ")),K.push(T))):R||L?(t.removeChild(T),w.splice(v--,1),p--):M||t.appendChild(T);if(R){for(L&&(P=r.createElement("div"),t.appendChild(P),O=P.offsetWidth+"px",b=P.offsetParent===t?0:t.offsetLeft,t.removeChild(P)),S=t.style.cssText,t.style.cssText="display:none;";t.firstChild;)t.removeChild(t.firstChild);for(k=!L||!M&&!E,v=0;R.length>v;v++){for(f=R[v],(P=r.createElement("div")).style.cssText="display:block;text-align:"+B+";position:"+(L?"absolute;":"relative;"),q&&(P.className=q+(Q?v+1:"")),tt.push(P),p=f.length,y=0;p>y;y++)"BR"!==f[y].nodeName&&(T=f[y],P.appendChild(T),k&&(T._wordEnd||M)&&P.appendChild(r.createTextNode(" ")),L&&(0===y&&(P.style.top=T._y+"px",P.style.left=N+b+"px"),T.style.top="0px",b&&(T.style.left=T._x-b+"px")));0===p&&(P.innerHTML="&nbsp;"),M||E||(P.innerHTML=n(P).split(String.fromCharCode(160)).join(" ")),L&&(P.style.width=O,P.style.height=T._h+"px"),t.appendChild(P)}t.style.cssText=S}L&&(G>t.clientHeight&&(t.style.height=G-Y+"px",G>t.clientHeight&&(t.style.height=G+z+"px")),U>t.clientWidth&&(t.style.width=U-j+"px",U>t.clientWidth&&(t.style.width=U+F+"px"))),_(i,K),_(a,J),_(l,tt)},g=f.prototype;g.split=function(t){this.isSplit&&this.revert(),this.vars=t||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var e=this.elements.length;--e>-1;)this._originals[e]=this.elements[e].innerHTML,m(this.elements[e],this.vars,this.chars,this.words,this.lines);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},g.revert=function(){if(!this._originals)throw"revert() call wasn't scoped properly.";for(var t=this._originals.length;--t>-1;)this.elements[t].innerHTML=this._originals[t];return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},f.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(f.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)},f.version="0.3.3"}(_gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope).SplitText};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(module.exports=e())}();try{window.GreenSockGlobals=null,window._gsQueue=null,window._gsDefine=null,delete window.GreenSockGlobals,delete window._gsQueue,delete window._gsDefine}catch(t){}try{window.GreenSockGlobals=oldgs,window._gsQueue=oldgs_queue}catch(t){}if(1==window.tplogs)try{console.groupEnd()}catch(t){}!function(t,e){t.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage"]},t.expr[":"].uncached=function(e){var i=document.createElement("img");return i.src=e.src,t(e).is('img[src!=""]')&&!i.complete},t.fn.waitForImages=function(e,i,n){if(t.isPlainObject(arguments[0])&&(i=e.each,n=e.waitForAll,e=e.finished),e=e||t.noop,i=i||t.noop,n=!!n,!t.isFunction(e)||!t.isFunction(i))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var r=t(this),s=[];if(n){var a=t.waitForImages.hasImageProperties||[],o=/url\((['"]?)(.*?)\1\)/g;r.find("*").each(function(){var e=t(this);e.is("img:uncached")&&s.push({src:e.attr("src"),element:e[0]}),t.each(a,function(t,i){var n,r=e.css(i);if(!r)return!0;for(;n=o.exec(r);)s.push({src:n[2],element:e[0]})})})}else r.find("img:uncached").each(function(){s.push({src:this.src,element:this})});var l=s.length,h=0;0==l&&e.call(r[0]),t.each(s,function(n,s){var a=new Image;t(a).bind("load error",function(t){if(h++,i.call(s.element,h,l,"load"==t.type),h==l)return e.call(r[0]),!1}),a.src=s.src})})}}(jQuery);

/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 4.6.7 (05.01.2015)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
 **************************************************************************/

function revslider_showDoubleJqueryError(e){var t="Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";t+="<br> This includes make eliminates the revolution slider libraries, and make it not work.";t+="<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";t+="<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";t="<span style='font-size:16px;color:#BC0C06;'>"+t+"</span>";jQuery(e).show().html(t)}(function(e,t){function n(){var e=false;if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)){if(navigator.userAgent.match(/OS 4_\d like Mac OS X/i)){e=true}}else{e=false}return e}function r(r,i){if(r==t)return false;if(r.data("aimg")!=t){if(r.data("aie8")=="enabled"&&a(8)||r.data("amobile")=="enabled"&&J())r.html('<img class="tp-slider-alternative-image" src="'+r.data("aimg")+'">')}if(i.navigationStyle=="preview1"||i.navigationStyle=="preview3"||i.navigationStyle=="preview4"){i.soloArrowLeftHalign="left";i.soloArrowLeftValign="center";i.soloArrowLeftHOffset=0;i.soloArrowLeftVOffset=0;i.soloArrowRightHalign="right";i.soloArrowRightValign="center";i.soloArrowRightHOffset=0;i.soloArrowRightVOffset=0;i.navigationArrows="solo"}if(i.simplifyAll=="on"&&(a(8)||n())){r.find(".tp-caption").each(function(){var t=e(this);t.removeClass("customin").removeClass("customout").addClass("fadein").addClass("fadeout");t.data("splitin","");t.data("speed",400)});r.find(">ul>li").each(function(){var t=e(this);t.data("transition","fade");t.data("masterspeed",500);t.data("slotamount",1);var n=t.find(">img").first();n.data("kenburns","off")})}i.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);if(i.fullWidth!="on"&&i.fullScreen!="on")i.autoHeight="off";if(i.fullScreen=="on")i.autoHeight="on";if(i.fullWidth!="on"&&i.fullScreen!="on")forceFulWidth="off";if(i.fullWidth=="on"&&i.autoHeight=="off")r.css({maxHeight:i.startheight+"px"});if(J()&&i.hideThumbsOnMobile=="on"&&i.navigationType=="thumb")i.navigationType="none";if(J()&&i.hideBulletsOnMobile=="on"&&i.navigationType=="bullet")i.navigationType="none";if(J()&&i.hideBulletsOnMobile=="on"&&i.navigationType=="both")i.navigationType="none";if(J()&&i.hideArrowsOnMobile=="on")i.navigationArrows="none";if(i.forceFullWidth=="on"&&r.closest(".forcefullwidth_wrapper_tp_banner").length==0){var f=r.parent().offset().left;var v=r.parent().css("marginBottom");var m=r.parent().css("marginTop");if(v==t)v=0;if(m==t)m=0;r.parent().wrap('<div style="position:relative;width:100%;height:auto;margin-top:'+m+";margin-bottom:"+v+'" class="forcefullwidth_wrapper_tp_banner"></div>');r.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:'+r.height()+'px"></div>');r.css({backgroundColor:r.parent().css("backgroundColor"),backgroundImage:r.parent().css("backgroundImage")});r.parent().css({left:0-f+"px",position:"absolute",width:e(window).width()});i.width=e(window).width()}try{if(i.hideThumbsUnderResolution>e(window).width()&&i.hideThumbsUnderResolution!=0){r.parent().find(".tp-bullets.tp-thumbs").css({display:"none"})}else{r.parent().find(".tp-bullets.tp-thumbs").css({display:"block"})}}catch(g){}if(!r.hasClass("revslider-initialised")){r.addClass("revslider-initialised");if(r.attr("id")==t)r.attr("id","revslider-"+Math.round(Math.random()*1e3+5));i.firefox13=false;i.ie=!e.support.opacity;i.ie9=document.documentMode==9;i.origcd=i.delay;var b=e.fn.jquery.split("."),w=parseFloat(b[0]),E=parseFloat(b[1]),S=parseFloat(b[2]||"0");if(w==1&&E<7){r.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:'+b+" <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>")}if(w>1)i.ie=false;if(!e.support.transition)e.fn.transition=e.fn.animate;r.find(".caption").each(function(){e(this).addClass("tp-caption")});if(J()){r.find(".tp-caption").each(function(){var t=e(this);if(t.data("autoplayonlyfirsttime")==true||t.data("autoplayonlyfirsttime")=="true")t.data("autoplayonlyfirsttime","false");if(t.data("autoplay")==true||t.data("autoplay")=="true")t.data("autoplay",false)})}var x=0;var T=0;var C=0;var k="http";if(location.protocol==="https:"){k="https"}r.find(".tp-caption").each(function(n){try{if((e(this).data("ytid")!=t||e(this).find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&x==0){x=1;var r=document.createElement("script");var i="https";r.src=i+"://www.youtube.com/iframe_api";var s=document.getElementsByTagName("script")[0];var o=true;e("head").find("*").each(function(){if(e(this).attr("src")==i+"://www.youtube.com/iframe_api")o=false});if(o){s.parentNode.insertBefore(r,s)}}}catch(u){}try{if((e(this).data("vimeoid")!=t||e(this).find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&T==0){T=1;var a=document.createElement("script");a.src=k+"://a.vimeocdn.com/js/froogaloop2.min.js";var s=document.getElementsByTagName("script")[0];var o=true;e("head").find("*").each(function(){if(e(this).attr("src")==k+"://a.vimeocdn.com/js/froogaloop2.min.js")o=false});if(o)s.parentNode.insertBefore(a,s)}}catch(u){}try{if(e(this).data("videomp4")!=t||e(this).data("videowebm")!=t){}}catch(u){}});r.find(".tp-caption video").each(function(t){e(this).removeClass("video-js").removeClass("vjs-default-skin");e(this).attr("preload","");e(this).css({display:"none"})});r.find(">ul:first-child >li").each(function(){var t=e(this);t.data("origindex",t.index())});if(i.shuffle=="on"){var L=new Object,A=r.find(">ul:first-child >li:first-child");L.fstransition=A.data("fstransition");L.fsmasterspeed=A.data("fsmasterspeed");L.fsslotamount=A.data("fsslotamount");for(var O=0;O<r.find(">ul:first-child >li").length;O++){var M=Math.round(Math.random()*r.find(">ul:first-child >li").length);r.find(">ul:first-child >li:eq("+M+")").prependTo(r.find(">ul:first-child"))}var _=r.find(">ul:first-child >li:first-child");_.data("fstransition",L.fstransition);_.data("fsmasterspeed",L.fsmasterspeed);_.data("fsslotamount",L.fsslotamount)}i.slots=4;i.act=-1;i.next=0;if(i.startWithSlide!=t)i.next=i.startWithSlide;var D=o("#")[0];if(D.length<9){if(D.split("slide").length>1){var P=parseInt(D.split("slide")[1],0);if(P<1)P=1;if(P>r.find(">ul:first >li").length)P=r.find(">ul:first >li").length;i.next=P-1}}i.firststart=1;if(i.navigationHOffset==t)i.navOffsetHorizontal=0;if(i.navigationVOffset==t)i.navOffsetVertical=0;r.append('<div class="tp-loader '+i.spinner+'">'+'<div class="dot1"></div>'+'<div class="dot2"></div>'+'<div class="bounce1"></div>'+'<div class="bounce2"></div>'+'<div class="bounce3"></div>'+"</div>");if(r.find(".tp-bannertimer").length==0)r.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');var H=r.find(".tp-bannertimer");if(H.length>0){H.css({width:"0%"})}r.addClass("tp-simpleresponsive");i.container=r;i.slideamount=r.find(">ul:first >li").length;if(r.height()==0)r.height(i.startheight);if(i.startwidth==t||i.startwidth==0)i.startwidth=r.width();if(i.startheight==t||i.startheight==0)i.startheight=r.height();i.width=r.width();i.height=r.height();i.bw=i.startwidth/r.width();i.bh=i.startheight/r.height();if(i.width!=i.startwidth){i.height=Math.round(i.startheight*(i.width/i.startwidth));r.height(i.height)}if(i.shadow!=0){r.parent().append('<div class="tp-bannershadow tp-shadow'+i.shadow+'"></div>');var f=0;if(i.forceFullWidth=="on")f=0-i.container.parent().offset().left;r.parent().find(".tp-bannershadow").css({width:i.width,left:f})}r.find("ul").css({display:"none"});var B=r;r.find("ul").css({display:"block"});y(r,i);if(i.parallax!="off")et(r,i);if(i.slideamount>1)l(r,i);if(i.slideamount>1&&i.navigationType=="thumb")nt(r,i);if(i.slideamount>1)c(r,i);if(i.keyboardNavigation=="on")h(r,i);p(r,i);if(i.hideThumbs>0)d(r,i);setTimeout(function(){N(r,i)},i.startDelay);i.startDelay=0;if(i.slideamount>1)$(r,i);setTimeout(function(){r.trigger("revolution.slide.onloaded")},500);e("body").data("rs-fullScreenMode",false);e(window).on("mozfullscreenchange webkitfullscreenchange fullscreenchange",function(){e("body").data("rs-fullScreenMode",!e("body").data("rs-fullScreenMode"));if(e("body").data("rs-fullScreenMode")){setTimeout(function(){e(window).trigger("resize")},200)}});var j="resize.revslider-"+r.attr("id");e(window).on(j,function(){if(r==t)return false;if(e("body").find(r)!=0)if(i.forceFullWidth=="on"){var n=i.container.closest(".forcefullwidth_wrapper_tp_banner").offset().left;i.container.parent().css({left:0-n+"px",width:e(window).width()})}if(r.outerWidth(true)!=i.width||r.is(":hidden")){u(r,i)}});try{if(i.hideThumbsUnderResoluition!=0&&i.navigationType=="thumb"){if(i.hideThumbsUnderResoluition>e(window).width())e(".tp-bullets").css({display:"none"});else e(".tp-bullets").css({display:"block"})}}catch(g){}r.find(".tp-scrollbelowslider").on("click",function(){var t=0;try{t=e("body").find(i.fullScreenOffsetContainer).height()}catch(n){}try{t=t-parseInt(e(this).data("scrolloffset"),0)}catch(n){}e("body,html").animate({scrollTop:r.offset().top+r.find(">ul >li").height()-t+"px"},{duration:400})});var F=r.parent();if(e(window).width()<i.hideSliderAtLimit){r.trigger("stoptimer");if(F.css("display")!="none")F.data("olddisplay",F.css("display"));F.css({display:"none"})}if(!i.disableFocusListener&&i.disableFocusListener!="true"&&i.disableFocusListener!==true)s(r,i)}}e.fn.extend({revolution:function(n){var i={delay:9e3,startheight:500,startwidth:960,fullScreenAlignForce:"off",autoHeight:"off",hideTimerBar:"off",hideThumbs:200,hideNavDelayOnMobile:1500,thumbWidth:100,thumbHeight:50,thumbAmount:3,navigationType:"bullet",navigationArrows:"solo",navigationInGrid:"off",hideThumbsOnMobile:"off",hideBulletsOnMobile:"off",hideArrowsOnMobile:"off",hideThumbsUnderResoluition:0,navigationStyle:"round",navigationHAlign:"center",navigationVAlign:"bottom",navigationHOffset:0,navigationVOffset:20,soloArrowLeftHalign:"left",soloArrowLeftValign:"center",soloArrowLeftHOffset:20,soloArrowLeftVOffset:0,soloArrowRightHalign:"right",soloArrowRightValign:"center",soloArrowRightHOffset:20,soloArrowRightVOffset:0,keyboardNavigation:"on",touchenabled:"on",onHoverStop:"on",stopAtSlide:-1,stopAfterLoops:-1,hideCaptionAtLimit:0,hideAllCaptionAtLimit:0,hideSliderAtLimit:0,shadow:0,fullWidth:"off",fullScreen:"off",minFullScreenHeight:0,fullScreenOffsetContainer:"",fullScreenOffset:"0",dottedOverlay:"none",forceFullWidth:"off",spinner:"spinner0",swipe_treshold:75,swipe_min_touches:1,drag_block_vertical:false,isJoomla:false,parallax:"off",parallaxLevels:[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85],parallaxBgFreeze:"off",parallaxOpacity:"on",parallaxDisableOnMobile:"off",panZoomDisableOnMobile:"off",simplifyAll:"on",minHeight:0,nextSlideOnWindowFocus:"off",disableFocusListener:true,startDelay:0};n=e.extend({},i,n);return this.each(function(){if(window.tplogs==true)try{console.groupCollapsed("Slider Revolution 4.6.3 Initialisation on "+e(this).attr("id"));console.groupCollapsed("Used Options:");console.info(n);console.groupEnd();console.groupCollapsed("Tween Engine:")}catch(i){}if(punchgs.TweenLite==t){if(window.tplogs==true)try{console.error("GreenSock Engine Does not Exist!")}catch(i){}return false}punchgs.force3D=true;if(window.tplogs==true)try{console.info("GreenSock Engine Version in Slider Revolution:"+punchgs.TweenLite.version)}catch(i){}if(n.simplifyAll=="on"){}else{punchgs.TweenLite.lagSmoothing(1e3,16);punchgs.force3D="true"}if(window.tplogs==true)try{console.groupEnd();console.groupEnd()}catch(i){}r(e(this),n)})},revscroll:function(n){return this.each(function(){var r=e(this);if(r!=t&&r.length>0&&e("body").find("#"+r.attr("id")).length>0)e("body,html").animate({scrollTop:r.offset().top+r.find(">ul >li").height()-n+"px"},{duration:400})})},revredraw:function(n){return this.each(function(){var n=e(this);if(n!=t&&n.length>0&&e("body").find("#"+n.attr("id")).length>0){var r=n.parent().find(".tp-bannertimer");var i=r.data("opt");u(n,i)}})},revkill:function(n){var r=this,i=e(this);if(i!=t&&i.length>0&&e("body").find("#"+i.attr("id")).length>0){i.data("conthover",1);i.data("conthover-changed",1);i.trigger("revolution.slide.onpause");var s=i.parent().find(".tp-bannertimer");var o=s.data("opt");o.bannertimeronpause=true;i.trigger("stoptimer");punchgs.TweenLite.killTweensOf(i.find("*"),false);punchgs.TweenLite.killTweensOf(i,false);i.unbind("hover, mouseover, mouseenter,mouseleave, resize");var u="resize.revslider-"+i.attr("id");e(window).off(u);i.find("*").each(function(){var n=e(this);n.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer");n.off("on, hover, mouseenter,mouseleave,mouseover, resize");n.data("mySplitText",null);n.data("ctl",null);if(n.data("tween")!=t)n.data("tween").kill();if(n.data("kenburn")!=t)n.data("kenburn").kill();n.remove();n.empty();n=null});punchgs.TweenLite.killTweensOf(i.find("*"),false);punchgs.TweenLite.killTweensOf(i,false);s.remove();try{i.closest(".forcefullwidth_wrapper_tp_banner").remove()}catch(a){}try{i.closest(".rev_slider_wrapper").remove()}catch(a){}try{i.remove()}catch(a){}i.empty();i.html();i=null;o=null;delete r.container;delete r.opt;return true}else{return false}},revpause:function(n){return this.each(function(){var n=e(this);if(n!=t&&n.length>0&&e("body").find("#"+n.attr("id")).length>0){n.data("conthover",1);n.data("conthover-changed",1);n.trigger("revolution.slide.onpause");var r=n.parent().find(".tp-bannertimer");var i=r.data("opt");i.bannertimeronpause=true;n.trigger("stoptimer")}})},revresume:function(n){return this.each(function(){var n=e(this);if(n!=t&&n.length>0&&e("body").find("#"+n.attr("id")).length>0){n.data("conthover",0);n.data("conthover-changed",1);n.trigger("revolution.slide.onresume");var r=n.parent().find(".tp-bannertimer");var i=r.data("opt");i.bannertimeronpause=false;n.trigger("starttimer")}})},revnext:function(n){return this.each(function(){var n=e(this);if(n!=t&&n.length>0&&e("body").find("#"+n.attr("id")).length>0)n.parent().find(".tp-rightarrow").click()})},revprev:function(n){return this.each(function(){var n=e(this);if(n!=t&&n.length>0&&e("body").find("#"+n.attr("id")).length>0)n.parent().find(".tp-leftarrow").click()})},revmaxslide:function(t){return e(this).find(">ul:first-child >li").length},revcurrentslide:function(n){var r=e(this);if(r!=t&&r.length>0&&e("body").find("#"+r.attr("id")).length>0){var i=r.parent().find(".tp-bannertimer");var s=i.data("opt");return s.act}},revlastslide:function(n){var r=e(this);if(r!=t&&r.length>0&&e("body").find("#"+r.attr("id")).length>0){var i=r.parent().find(".tp-bannertimer");var s=i.data("opt");return s.lastslide}},revshowslide:function(n){return this.each(function(){var r=e(this);if(r!=t&&r.length>0&&e("body").find("#"+r.attr("id")).length>0){r.data("showus",n);r.parent().find(".tp-rightarrow").click()}})}});var i=function(){var e,t,n={hidden:"visibilitychange",webkitHidden:"webkitvisibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange"};for(e in n){if(e in document){t=n[e];break}}return function(n){if(n)document.addEventListener(t,n);return!document[e]}}();var s=function(n,r){var i=document.documentMode===t,s=window.chrome;if(i&&!s){e(window).on("focusin",function(){if(n==t)return false;setTimeout(function(){if(r.nextSlideOnWindowFocus=="on")n.revnext();n.revredraw()},300)}).on("focusout",function(){})}else{if(window.addEventListener){window.addEventListener("focus",function(e){if(n==t)return false;setTimeout(function(){if(r.nextSlideOnWindowFocus=="on")n.revnext();n.revredraw()},300)},false);window.addEventListener("blur",function(e){},false)}else{window.attachEvent("focus",function(e){setTimeout(function(){if(n==t)return false;if(r.nextSlideOnWindowFocus=="on")n.revnext();n.revredraw()},300)});window.attachEvent("blur",function(e){})}}};var o=function(e){var t=[],n;var r=window.location.href.slice(window.location.href.indexOf(e)+1).split("_");for(var i=0;i<r.length;i++){r[i]=r[i].replace("%3D","=");n=r[i].split("=");t.push(n[0]);t[n[0]]=n[1]}return t};var u=function(n,r){if(n==t)return false;try{if(r.hideThumbsUnderResoluition!=0&&r.navigationType=="thumb"){if(r.hideThumbsUnderResoluition>e(window).width())e(".tp-bullets").css({display:"none"});else e(".tp-bullets").css({display:"block"})}}catch(i){}n.find(".defaultimg").each(function(t){g(e(this),r)});var s=n.parent();if(e(window).width()<r.hideSliderAtLimit){n.trigger("stoptimer");if(s.css("display")!="none")s.data("olddisplay",s.css("display"));s.css({display:"none"})}else{if(n.is(":hidden")){if(s.data("olddisplay")!=t&&s.data("olddisplay")!="undefined"&&s.data("olddisplay")!="none")s.css({display:s.data("olddisplay")});else s.css({display:"block"});n.trigger("restarttimer");setTimeout(function(){u(n,r)},150)}}var o=0;if(r.forceFullWidth=="on")o=0-r.container.parent().offset().left;try{n.parent().find(".tp-bannershadow").css({width:r.width,left:o})}catch(i){}var a=n.find(">ul >li:eq("+r.act+") .slotholder");var f=n.find(">ul >li:eq("+r.next+") .slotholder");E(n,r,n);punchgs.TweenLite.set(f.find(".defaultimg"),{opacity:0});a.find(".defaultimg").css({opacity:1});f.find(".defaultimg").each(function(){var i=e(this);if(r.panZoomDisableOnMobile=="on"){}else{if(i.data("kenburn")!=t){i.data("kenburn").restart();Q(n,r,true)}}});var l=n.find(">ul >li:eq("+r.next+")");var c=n.parent().find(".tparrows");if(c.hasClass("preview2"))c.css({width:parseInt(c.css("minWidth"),0)});j(l,r,true);v(n,r)};var a=function(t,n){var r=e('<div style="display:none;"/>').appendTo(e("body"));r.html("<!--[if "+(n||"")+" IE "+(t||"")+"]><a>&nbsp;</a><![endif]-->");var i=r.find("a").length;r.remove();return i};var f=function(e,t){if(e.next==t.find(">ul >li").length-1){e.looptogo=e.looptogo-1;if(e.looptogo<=0)e.stopLoop="on"}N(t,e)};var l=function(t,n){var r="hidebullets";if(n.hideThumbs==0)r="";if(n.navigationType=="bullet"||n.navigationType=="both"){t.parent().append('<div class="tp-bullets '+r+" simplebullets "+n.navigationStyle+'"></div>')}var i=t.parent().find(".tp-bullets");t.find(">ul:first >li").each(function(e){var n=t.find(">ul:first >li:eq("+e+") img:first").attr("src");i.append('<div class="bullet"></div>');var r=i.find(".bullet:first")});i.find(".bullet").each(function(r){var i=e(this);if(r==n.slideamount-1)i.addClass("last");if(r==0)i.addClass("first");i.click(function(){var e=false,r=i.index();if(n.navigationArrows=="withbullet"||n.navigationArrows=="nexttobullets")r=i.index()-1;if(r==n.act)e=true;if(n.transition==0&&!e){n.next=r;f(n,t)}})});i.append('<div class="tpclear"></div>');v(t,n)};var c=function(e,n){function u(t){e.parent().append('<div style="'+i+'" class="tp-'+t+"arrow "+s+" tparrows "+o+'"><div class="tp-arr-allwrapper"><div class="tp-arr-iwrapper"><div class="tp-arr-imgholder"></div><div class="tp-arr-imgholder2"></div><div class="tp-arr-titleholder"></div><div class="tp-arr-subtitleholder"></div></div></div></div>')}var r=e.find(".tp-bullets"),i="",s="hidearrows",o=n.navigationStyle;if(n.hideThumbs==0)s="";if(n.navigationArrows=="none")i="visibility:hidden;display:none";n.soloArrowStyle="default"+" "+n.navigationStyle;if(n.navigationArrows!="none"&&n.navigationArrows!="nexttobullets")o=n.soloArrowStyle;u("left");u("right");e.parent().find(".tp-rightarrow").click(function(){if(n.transition==0){if(e.data("showus")!=t&&e.data("showus")!=-1)n.next=e.data("showus")-1;else n.next=n.next+1;e.data("showus",-1);if(n.next>=n.slideamount)n.next=0;if(n.next<0)n.next=0;if(n.act!=n.next)f(n,e)}});e.parent().find(".tp-leftarrow").click(function(){if(n.transition==0){n.next=n.next-1;n.leftarrowpressed=1;if(n.next<0)n.next=n.slideamount-1;f(n,e)}});v(e,n)};var h=function(n,r){e(document).keydown(function(e){if(r.transition==0&&e.keyCode==39){if(n.data("showus")!=t&&n.data("showus")!=-1)r.next=n.data("showus")-1;else r.next=r.next+1;n.data("showus",-1);if(r.next>=r.slideamount)r.next=0;if(r.next<0)r.next=0;if(r.act!=r.next)f(r,n)}if(r.transition==0&&e.keyCode==37){r.next=r.next-1;r.leftarrowpressed=1;if(r.next<0)r.next=r.slideamount-1;f(r,n)}});v(n,r)};var p=function(t,n){var r="vertical";if(n.touchenabled=="on"){if(n.drag_block_vertical==true)r="none";t.swipe({allowPageScroll:r,fingers:n.swipe_min_touches,treshold:n.swipe_treshold,swipe:function(i,s,o,u,a,l){switch(s){case"left":if(n.transition==0){n.next=n.next+1;if(n.next==n.slideamount)n.next=0;f(n,t)}break;case"right":if(n.transition==0){n.next=n.next-1;n.leftarrowpressed=1;if(n.next<0)n.next=n.slideamount-1;f(n,t)}break;case"up":if(r=="none")e("html, body").animate({scrollTop:t.offset().top+t.height()+"px"});break;case"down":if(r=="none")e("html, body").animate({scrollTop:t.offset().top-e(window).height()+"px"});break}}})}};var d=function(e,t){var n=e.parent().find(".tp-bullets"),r=e.parent().find(".tparrows");if(n==null){e.append('<div class=".tp-bullets"></div>');var n=e.parent().find(".tp-bullets")}if(r==null){e.append('<div class=".tparrows"></div>');var r=e.parent().find(".tparrows")}e.data("hideThumbs",t.hideThumbs);n.addClass("hidebullets");r.addClass("hidearrows");if(J()){try{e.hammer().on("touch",function(){e.addClass("hovered");if(t.onHoverStop=="on")e.trigger("stoptimer");clearTimeout(e.data("hideThumbs"));n.removeClass("hidebullets");r.removeClass("hidearrows")});e.hammer().on("release",function(){e.removeClass("hovered");e.trigger("starttimer");if(!e.hasClass("hovered")&&!n.hasClass("hovered"))e.data("hideThumbs",setTimeout(function(){n.addClass("hidebullets");r.addClass("hidearrows");e.trigger("starttimer")},t.hideNavDelayOnMobile))})}catch(i){}}else{n.hover(function(){t.overnav=true;if(t.onHoverStop=="on")e.trigger("stoptimer");n.addClass("hovered");clearTimeout(e.data("hideThumbs"));n.removeClass("hidebullets");r.removeClass("hidearrows")},function(){t.overnav=false;e.trigger("starttimer");n.removeClass("hovered");if(!e.hasClass("hovered")&&!n.hasClass("hovered"))e.data("hideThumbs",setTimeout(function(){n.addClass("hidebullets");r.addClass("hidearrows")},t.hideThumbs))});r.hover(function(){t.overnav=true;if(t.onHoverStop=="on")e.trigger("stoptimer");n.addClass("hovered");clearTimeout(e.data("hideThumbs"));n.removeClass("hidebullets");r.removeClass("hidearrows")},function(){t.overnav=false;e.trigger("starttimer");n.removeClass("hovered")});e.on("mouseenter",function(){e.addClass("hovered");if(t.onHoverStop=="on")e.trigger("stoptimer");clearTimeout(e.data("hideThumbs"));n.removeClass("hidebullets");r.removeClass("hidearrows")});e.on("mouseleave",function(){e.removeClass("hovered");e.trigger("starttimer");if(!e.hasClass("hovered")&&!n.hasClass("hovered"))e.data("hideThumbs",setTimeout(function(){n.addClass("hidebullets");r.addClass("hidearrows")},t.hideThumbs))})}};var v=function(t,n){var r=t.parent();var i=r.find(".tp-bullets");if(n.navigationType=="thumb"){i.find(".thumb").each(function(t){var r=e(this);r.css({width:n.thumbWidth*n.bw+"px",height:n.thumbHeight*n.bh+"px"})});var s=i.find(".tp-mask");s.width(n.thumbWidth*n.thumbAmount*n.bw);s.height(n.thumbHeight*n.bh);s.parent().width(n.thumbWidth*n.thumbAmount*n.bw);s.parent().height(n.thumbHeight*n.bh)}var o=r.find(".tp-leftarrow");var u=r.find(".tp-rightarrow");if(n.navigationType=="thumb"&&n.navigationArrows=="nexttobullets")n.navigationArrows="solo";if(n.navigationArrows=="nexttobullets"){o.prependTo(i).css({"float":"left"});u.insertBefore(i.find(".tpclear")).css({"float":"left"})}var a=0;if(n.forceFullWidth=="on")a=0-n.container.parent().offset().left;var f=0,l=0;if(n.navigationInGrid=="on"){f=t.width()>n.startwidth?(t.width()-n.startwidth)/2:0,l=t.height()>n.startheight?(t.height()-n.startheight)/2:0}if(n.navigationArrows!="none"&&n.navigationArrows!="nexttobullets"){var c=n.soloArrowLeftValign,h=n.soloArrowLeftHalign,p=n.soloArrowRightValign,d=n.soloArrowRightHalign,v=n.soloArrowLeftVOffset,m=n.soloArrowLeftHOffset,g=n.soloArrowRightVOffset,y=n.soloArrowRightHOffset;o.css({position:"absolute"});u.css({position:"absolute"});if(c=="center")o.css({top:"50%",marginTop:v-Math.round(o.innerHeight()/2)+"px"});else if(c=="bottom")o.css({top:"auto",bottom:0+v+"px"});else if(c=="top")o.css({bottom:"auto",top:0+v+"px"});if(h=="center")o.css({left:"50%",marginLeft:a+m-Math.round(o.innerWidth()/2)+"px"});else if(h=="left")o.css({left:f+m+a+"px"});else if(h=="right")o.css({right:f+m-a+"px"});if(p=="center")u.css({top:"50%",marginTop:g-Math.round(u.innerHeight()/2)+"px"});else if(p=="bottom")u.css({top:"auto",bottom:0+g+"px"});else if(p=="top")u.css({bottom:"auto",top:0+g+"px"});if(d=="center")u.css({left:"50%",marginLeft:a+y-Math.round(u.innerWidth()/2)+"px"});else if(d=="left")u.css({left:f+y+a+"px"});else if(d=="right")u.css({right:f+y-a+"px"});if(o.position()!=null)o.css({top:Math.round(parseInt(o.position().top,0))+"px"});if(u.position()!=null)u.css({top:Math.round(parseInt(u.position().top,0))+"px"})}if(n.navigationArrows=="none"){o.css({visibility:"hidden"});u.css({visibility:"hidden"})}var b=n.navigationVAlign,w=n.navigationHAlign,E=n.navigationVOffset*n.bh,S=n.navigationHOffset*n.bw;if(b=="center")i.css({top:"50%",marginTop:E-Math.round(i.innerHeight()/2)+"px"});if(b=="bottom")i.css({bottom:0+E+"px"});if(b=="top")i.css({top:0+E+"px"});if(w=="center")i.css({left:"50%",marginLeft:a+S-Math.round(i.innerWidth()/2)+"px"});if(w=="left")i.css({left:0+S+a+"px"});if(w=="right")i.css({right:0+S-a+"px"})};var m=function(n){var r=n.container;n.beforli=n.next-1;n.comingli=n.next+1;if(n.beforli<0)n.beforli=n.slideamount-1;if(n.comingli>=n.slideamount)n.comingli=0;var i=r.find(">ul:first-child >li:eq("+n.comingli+")"),s=r.find(">ul:first-child >li:eq("+n.beforli+")"),o=s.find(".defaultimg").attr("src"),u=i.find(".defaultimg").attr("src");if(n.arr==t){n.arr=r.parent().find(".tparrows"),n.rar=r.parent().find(".tp-rightarrow"),n.lar=r.parent().find(".tp-leftarrow"),n.raimg=n.rar.find(".tp-arr-imgholder"),n.laimg=n.lar.find(".tp-arr-imgholder"),n.raimg_b=n.rar.find(".tp-arr-imgholder2"),n.laimg_b=n.lar.find(".tp-arr-imgholder2"),n.ratit=n.rar.find(".tp-arr-titleholder"),n.latit=n.lar.find(".tp-arr-titleholder")}var a=n.arr,f=n.rar,l=n.lar,c=n.raimg,h=n.laimg,p=n.raimg_b,d=n.laimg_b,v=n.ratit,m=n.latit;if(i.data("title")!=t)v.html(i.data("title"));if(s.data("title")!=t)m.html(s.data("title"));if(f.hasClass("itishovered")){f.width(v.outerWidth(true)+parseInt(f.css("minWidth"),0))}if(l.hasClass("itishovered")){l.width(m.outerWidth(true)+parseInt(l.css("minWidth"),0))}if(a.hasClass("preview2")&&!a.hasClass("hashoveralready")){a.addClass("hashoveralready");if(!J())a.hover(function(){var t=e(this),n=t.find(".tp-arr-titleholder");if(e(window).width()>767)t.width(n.outerWidth(true)+parseInt(t.css("minWidth"),0));t.addClass("itishovered")},function(){var t=e(this),n=t.find(".tp-arr-titleholder");t.css({width:parseInt(t.css("minWidth"),0)});t.removeClass("itishovered")});else{var a=e(this),g=a.find(".tp-arr-titleholder");g.addClass("alwayshidden");punchgs.TweenLite.set(g,{autoAlpha:0})}}if(s.data("thumb")!=t)o=s.data("thumb");if(i.data("thumb")!=t)u=i.data("thumb");if(!a.hasClass("preview4")){punchgs.TweenLite.to(c,.5,{autoAlpha:0,onComplete:function(){c.css({backgroundImage:"url("+u+")"});h.css({backgroundImage:"url("+o+")"})}});punchgs.TweenLite.to(h,.5,{autoAlpha:0,onComplete:function(){punchgs.TweenLite.to(c,.5,{autoAlpha:1,delay:.2});punchgs.TweenLite.to(h,.5,{autoAlpha:1,delay:.2})}})}else{p.css({backgroundImage:"url("+u+")"});d.css({backgroundImage:"url("+o+")"});punchgs.TweenLite.fromTo(p,.8,{force3D:punchgs.force3d,x:0},{x:-c.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){c.css({backgroundImage:"url("+u+")"});punchgs.TweenLite.set(p,{x:0})}});punchgs.TweenLite.fromTo(d,.8,{force3D:punchgs.force3d,x:0},{x:c.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){h.css({backgroundImage:"url("+o+")"});punchgs.TweenLite.set(d,{x:0})}});punchgs.TweenLite.fromTo(c,.8,{x:0},{force3D:punchgs.force3d,x:-c.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){punchgs.TweenLite.set(c,{x:0})}});punchgs.TweenLite.fromTo(h,.8,{x:0},{force3D:punchgs.force3d,x:c.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){punchgs.TweenLite.set(h,{x:0})}})}if(f.hasClass("preview4")&&!f.hasClass("hashoveralready")){f.addClass("hashoveralready");f.hover(function(){var t=e(this).find(".tp-arr-iwrapper");var n=e(this).find(".tp-arr-allwrapper");punchgs.TweenLite.fromTo(t,.4,{x:t.width()},{x:0,delay:.3,ease:punchgs.Power3.easeOut,overwrite:"all"});punchgs.TweenLite.to(n,.2,{autoAlpha:1,overwrite:"all"})},function(){var t=e(this).find(".tp-arr-iwrapper");var n=e(this).find(".tp-arr-allwrapper");punchgs.TweenLite.to(t,.4,{x:t.width(),ease:punchgs.Power3.easeOut,delay:.2,overwrite:"all"});punchgs.TweenLite.to(n,.2,{delay:.6,autoAlpha:0,overwrite:"all"})});l.hover(function(){var t=e(this).find(".tp-arr-iwrapper");var n=e(this).find(".tp-arr-allwrapper");punchgs.TweenLite.fromTo(t,.4,{x:0-t.width()},{x:0,delay:.3,ease:punchgs.Power3.easeOut,overwrite:"all"});punchgs.TweenLite.to(n,.2,{autoAlpha:1,overwrite:"all"})},function(){var t=e(this).find(".tp-arr-iwrapper");var n=e(this).find(".tp-arr-allwrapper");punchgs.TweenLite.to(t,.4,{x:0-t.width(),ease:punchgs.Power3.easeOut,delay:.2,overwrite:"all"});punchgs.TweenLite.to(n,.2,{delay:.6,autoAlpha:0,overwrite:"all"})})}};var g=function(n,r){r.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css({height:r.container.height()});r.container.closest(".rev_slider_wrapper").css({height:r.container.height()});r.width=parseInt(r.container.width(),0);r.height=parseInt(r.container.height(),0);r.bw=r.width/r.startwidth;r.bh=r.height/r.startheight;if(r.bh>r.bw)r.bh=r.bw;if(r.bh<r.bw)r.bw=r.bh;if(r.bw<r.bh)r.bh=r.bw;if(r.bh>1){r.bw=1;r.bh=1}if(r.bw>1){r.bw=1;r.bh=1}r.height=Math.round(r.startheight*(r.width/r.startwidth));if(r.height>r.startheight&&r.autoHeight!="on")r.height=r.startheight;if(r.fullScreen=="on"){r.height=r.bw*r.startheight;var i=r.container.parent().width();var s=e(window).height();if(r.fullScreenOffsetContainer!=t){try{var o=r.fullScreenOffsetContainer.split(",");e.each(o,function(t,n){s=s-e(n).outerHeight(true);if(s<r.minFullScreenHeight)s=r.minFullScreenHeight})}catch(u){}try{if(r.fullScreenOffset.split("%").length>1&&r.fullScreenOffset!=t&&r.fullScreenOffset.length>0){s=s-e(window).height()*parseInt(r.fullScreenOffset,0)/100}else{if(r.fullScreenOffset!=t&&r.fullScreenOffset.length>0)s=s-parseInt(r.fullScreenOffset,0)}if(s<r.minFullScreenHeight)s=r.minFullScreenHeight}catch(u){}}r.container.parent().height(s);r.container.closest(".rev_slider_wrapper").height(s);r.container.css({height:"100%"});r.height=s;if(r.minHeight!=t&&r.height<r.minHeight)r.height=r.minHeight}else{if(r.minHeight!=t&&r.height<r.minHeight)r.height=r.minHeight;r.container.height(r.height)}r.slotw=Math.ceil(r.width/r.slots);if(r.fullScreen=="on")r.sloth=Math.ceil(e(window).height()/r.slots);else r.sloth=Math.ceil(r.height/r.slots);if(r.autoHeight=="on")r.sloth=Math.ceil(n.height()/r.slots)};var y=function(n,r){n.find(".tp-caption").each(function(){e(this).addClass(e(this).data("transition"));e(this).addClass("start")});n.find(">ul:first").css({overflow:"hidden",width:"100%",height:"100%",maxHeight:n.parent().css("maxHeight")}).addClass("tp-revslider-mainul");if(r.autoHeight=="on"){n.find(">ul:first").css({overflow:"hidden",width:"100%",height:"100%",maxHeight:"none"});n.css({maxHeight:"none"});n.parent().css({maxHeight:"none"})}n.find(">ul:first >li").each(function(r){var i=e(this);i.addClass("tp-revslider-slidesli");i.css({width:"100%",height:"100%",overflow:"hidden"});if(i.data("link")!=t){var s=i.data("link");var o="_self";var u=60;if(i.data("slideindex")=="back")u=0;var a=checksl=i.data("linktoslide");if(a!=t){if(a!="next"&&a!="prev")n.find(">ul:first-child >li").each(function(){var t=e(this);if(t.data("origindex")+1==checksl)a=t.index()+1})}if(i.data("target")!=t)o=i.data("target");if(s!="slide")a="no";var f='<div class="tp-caption sft slidelink" style="width:100%;height:100%;z-index:'+u+';" data-x="center" data-y="center" data-linktoslide="'+a+'" data-start="0"><a style="width:100%;height:100%;display:block"';if(s!="slide")f=f+' target="'+o+'" href="'+s+'"';f=f+'><span style="width:100%;height:100%;display:block"></span></a></div>';i.append(f)}});n.parent().css({overflow:"visible"});n.find(">ul:first >li >img").each(function(n){var i=e(this);i.addClass("defaultimg");if(i.data("lazyload")!=t&&i.data("lazydone")!=1){}else{g(i,r)}if(a(8)){i.data("kenburns","off")}if(r.panZoomDisableOnMobile=="on"&&J()){i.data("kenburns","off");i.data("bgfit","cover")}i.wrap('<div class="slotholder" style="width:100%;height:100%;"'+'data-duration="'+i.data("duration")+'"'+'data-zoomstart="'+i.data("zoomstart")+'"'+'data-zoomend="'+i.data("zoomend")+'"'+'data-rotationstart="'+i.data("rotationstart")+'"'+'data-rotationend="'+i.data("rotationend")+'"'+'data-ease="'+i.data("ease")+'"'+'data-duration="'+i.data("duration")+'"'+'data-bgpositionend="'+i.data("bgpositionend")+'"'+'data-bgposition="'+i.data("bgposition")+'"'+'data-duration="'+i.data("duration")+'"'+'data-kenburns="'+i.data("kenburns")+'"'+'data-easeme="'+i.data("ease")+'"'+'data-bgfit="'+i.data("bgfit")+'"'+'data-bgfitend="'+i.data("bgfitend")+'"'+'data-owidth="'+i.data("owidth")+'"'+'data-oheight="'+i.data("oheight")+'"'+"></div>");if(r.dottedOverlay!="none"&&r.dottedOverlay!=t)i.closest(".slotholder").append('<div class="tp-dottedoverlay '+r.dottedOverlay+'"></div>');var s=i.attr("src"),o=i.data("lazyload"),u=i.data("bgfit"),f=i.data("bgrepeat"),l=i.data("bgposition");if(u==t)u="cover";if(f==t)f="no-repeat";if(l==t)l="center center";var c=i.closest(".slotholder");i.replaceWith('<div class="tp-bgimg defaultimg" data-lazyload="'+i.data("lazyload")+'" data-bgfit="'+u+'"data-bgposition="'+l+'" data-bgrepeat="'+f+'" data-lazydone="'+i.data("lazydone")+'" src="'+s+'" data-src="'+s+'" style="background-color:'+i.css("backgroundColor")+";background-repeat:"+f+";background-image:url("+s+");background-size:"+u+";background-position:"+l+';width:100%;height:100%;"></div>');if(a(8)){c.find(".tp-bgimg").css({backgroundImage:"none","background-image":"none"});c.find(".tp-bgimg").append('<img class="ieeightfallbackimage defaultimg" src="'+s+'" style="width:100%">')}i.css({opacity:0});i.data("li-id",n)})};var b=function(e,n,r,i){var s=e,o=s.find(".defaultimg"),u=s.data("zoomstart"),f=s.data("rotationstart");if(o.data("currotate")!=t)f=o.data("currotate");if(o.data("curscale")!=t&&i=="box")u=o.data("curscale")*100;else if(o.data("curscale")!=t)u=o.data("curscale");g(o,n);var l=o.data("src"),c=o.css("backgroundColor"),h=n.width,p=n.height,d=o.data("fxof"),v=0;if(n.autoHeight=="on")p=n.container.height();if(d==t)d=0;var m=0,y=o.data("bgfit"),b=o.data("bgrepeat"),E=o.data("bgposition");if(y==t)y="cover";if(b==t)b="no-repeat";if(E==t)E="center center";if(a(8)){s.data("kenburns","off");var S=l;l=""}switch(i){case"box":var x=0,T=0,N=0;if(n.sloth>n.slotw)x=n.sloth;else x=n.slotw;if(!r){var m=0-x}n.slotw=x;n.sloth=x;var T=0;var N=0;if(s.data("kenburns")=="on"){y=u;if(y.toString().length<4)y=K(y,s,n)}for(var C=0;C<n.slots;C++){N=0;for(var k=0;k<n.slots;k++){s.append('<div class="slot" '+'style="position:absolute;'+"top:"+(v+N)+"px;"+"left:"+(d+T)+"px;"+"width:"+x+"px;"+"height:"+x+"px;"+'overflow:hidden;">'+'<div class="slotslide" data-x="'+T+'" data-y="'+N+'" '+'style="position:absolute;'+"top:"+0+"px;"+"left:"+0+"px;"+"width:"+x+"px;"+"height:"+x+"px;"+'overflow:hidden;">'+'<div style="position:absolute;'+"top:"+(0-N)+"px;"+"left:"+(0-T)+"px;"+"width:"+h+"px;"+"height:"+p+"px;"+"background-color:"+c+";"+"background-image:url("+l+");"+"background-repeat:"+b+";"+"background-size:"+y+";background-position:"+E+';">'+"</div></div></div>");N=N+x;if(a(8)){s.find(".slot ").last().find(".slotslide").append('<img src="'+S+'">');w(s,n)}if(u!=t&&f!=t)punchgs.TweenLite.set(s.find(".slot").last(),{rotationZ:f})}T=T+x}break;case"vertical":case"horizontal":if(s.data("kenburns")=="on"){y=u;if(y.toString().length<4)y=K(y,s,n)}if(i=="horizontal"){if(!r)var m=0-n.slotw;for(var k=0;k<n.slots;k++){s.append('<div class="slot" style="position:absolute;'+"top:"+(0+v)+"px;"+"left:"+(d+k*n.slotw)+"px;"+"overflow:hidden;width:"+(n.slotw+.6)+"px;"+"height:"+p+'px">'+'<div class="slotslide" style="position:absolute;'+"top:0px;left:"+m+"px;"+"width:"+(n.slotw+.6)+"px;"+"height:"+p+'px;overflow:hidden;">'+'<div style="background-color:'+c+";"+"position:absolute;top:0px;"+"left:"+(0-k*n.slotw)+"px;"+"width:"+h+"px;height:"+p+"px;"+"background-image:url("+l+");"+"background-repeat:"+b+";"+"background-size:"+y+";background-position:"+E+';">'+"</div></div></div>");if(u!=t&&f!=t)punchgs.TweenLite.set(s.find(".slot").last(),{rotationZ:f});if(a(8)){s.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="'+S+'" style="width:100%;height:auto">');w(s,n)}}}else{if(!r)var m=0-n.sloth;for(var k=0;k<n.slots+2;k++){s.append('<div class="slot" style="position:absolute;'+"top:"+(v+k*n.sloth)+"px;"+"left:"+d+"px;"+"overflow:hidden;"+"width:"+h+"px;"+"height:"+n.sloth+'px">'+'<div class="slotslide" style="position:absolute;'+"top:"+m+"px;"+"left:0px;width:"+h+"px;"+"height:"+n.sloth+"px;"+'overflow:hidden;">'+'<div style="background-color:'+c+";"+"position:absolute;"+"top:"+(0-k*n.sloth)+"px;"+"left:0px;"+"width:"+h+"px;height:"+p+"px;"+"background-image:url("+l+");"+"background-repeat:"+b+";"+"background-size:"+y+";background-position:"+E+';">'+"</div></div></div>");if(u!=t&&f!=t)punchgs.TweenLite.set(s.find(".slot").last(),{rotationZ:f});if(a(8)){s.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="'+S+'" style="width:100%;height:auto;">');w(s,n)}}}break}};var w=function(e,t){if(a(8)){var n=e.find(".ieeightfallbackimage");var r=n.width(),i=n.height();if(t.startwidth/t.startheight<e.data("owidth")/e.data("oheight"))n.css({width:"auto",height:"100%"});else n.css({width:"100%",height:"auto"});setTimeout(function(){var r=n.width(),i=n.height(),s=e.data("bgposition");if(s=="center center")n.css({position:"absolute",top:t.height/2-i/2+"px",left:t.width/2-r/2+"px"});if(s=="center top"||s=="top center")n.css({position:"absolute",top:"0px",left:t.width/2-r/2+"px"});if(s=="center bottom"||s=="bottom center")n.css({position:"absolute",bottom:"0px",left:t.width/2-r/2+"px"});if(s=="right top"||s=="top right")n.css({position:"absolute",top:"0px",right:"0px"});if(s=="right bottom"||s=="bottom right")n.css({position:"absolute",bottom:"0px",right:"0px"});if(s=="right center"||s=="center right")n.css({position:"absolute",top:t.height/2-i/2+"px",right:"0px"});if(s=="left bottom"||s=="bottom left")n.css({position:"absolute",bottom:"0px",left:"0px"});if(s=="left center"||s=="center left")n.css({position:"absolute",top:t.height/2-i/2+"px",left:"0px"})},20)}};var E=function(t,n,r){r.find(".slot").each(function(){e(this).remove()});n.transition=0};var S=function(n,r){n.find("img, .defaultimg").each(function(n){var i=e(this),s=i.data("lazyload");if(s!=i.attr("src")&&r<3&&s!=t&&s!="undefined"){if(s!=t&&s!="undefined"){i.attr("src",s);var o=new Image;o.onload=function(e){i.data("lazydone",1);if(i.hasClass("defaultimg"))x(i,o)};o.error=function(){i.data("lazydone",1)};o.src=i.attr("src");if(o.complete){if(i.hasClass("defaultimg"))x(i,o);i.data("lazydone",1)}}}else{if((s===t||s==="undefined")&&i.data("lazydone")!=1){var o=new Image;o.onload=function(){if(i.hasClass("defaultimg"))x(i,o);i.data("lazydone",1)};o.error=function(){i.data("lazydone",1)};if(i.attr("src")!=t&&i.attr("src")!="undefined"){o.src=i.attr("src")}else o.src=i.data("src");if(o.complete){if(i.hasClass("defaultimg")){x(i,o)}i.data("lazydone",1)}}}})};var x=function(e,t){var n=e.closest("li"),r=t.width,i=t.height;n.data("owidth",r);n.data("oheight",i);n.find(".slotholder").data("owidth",r);n.find(".slotholder").data("oheight",i);n.data("loadeddone",1)};var T=function(n,r,i){S(n,0);var s=setInterval(function(){i.bannertimeronpause=true;i.container.trigger("stoptimer");i.cd=0;var o=0;n.find("img, .defaultimg").each(function(t){if(e(this).data("lazydone")!=1){o++}});if(o>0)S(n,o);else{clearInterval(s);if(r!=t)r()}},100)};var N=function(e,n){try{var r=e.find(">ul:first-child >li:eq("+n.act+")")}catch(i){var r=e.find(">ul:first-child >li:eq(1)")}n.lastslide=n.act;var s=e.find(">ul:first-child >li:eq("+n.next+")");var o=s.find(".defaultimg");n.bannertimeronpause=true;e.trigger("stoptimer");n.cd=0;if(o.data("lazyload")!=t&&o.data("lazyload")!="undefined"&&o.data("lazydone")!=1){if(!a(8))o.css({backgroundImage:'url("'+s.find(".defaultimg").data("lazyload")+'")'});else{o.attr("src",s.find(".defaultimg").data("lazyload"))}o.data("src",s.find(".defaultimg").data("lazyload"));o.data("lazydone",0);o.data("orgw",0);s.data("loadeddone",1);e.find(".tp-loader").css({display:"block"});T(e.find(".tp-static-layers"),function(){T(s,function(){var t=s.find(".slotholder");if(t.data("kenburns")=="on"){var r=setInterval(function(){var i=t.data("owidth");if(i>=0){clearInterval(r);C(n,o,e)}},10)}else C(n,o,e)},n)},n)}else{if(s.data("loadeddone")===t){s.data("loadeddone",1);T(s,function(){C(n,o,e)},n)}else C(n,o,e)}};var C=function(e,t,n){e.bannertimeronpause=false;e.cd=0;n.trigger("nulltimer");n.find(".tp-loader").css({display:"none"});g(t,e);v(n,e);g(t,e);k(n,e)};var k=function(e,n){e.trigger("revolution.slide.onbeforeswap");n.transition=1;n.videoplaying=false;try{var r=e.find(">ul:first-child >li:eq("+n.act+")")}catch(i){var r=e.find(">ul:first-child >li:eq(1)")}n.lastslide=n.act;var s=e.find(">ul:first-child >li:eq("+n.next+")");setTimeout(function(){m(n)},200);var o=r.find(".slotholder"),u=s.find(".slotholder");if(u.data("kenburns")=="on"||o.data("kenburns")=="on"){Z(e,n);e.find(".kenburnimg").remove()}if(s.data("delay")!=t){n.cd=0;n.delay=s.data("delay")}else{n.delay=n.origcd}if(n.firststart==1)punchgs.TweenLite.set(r,{autoAlpha:0});punchgs.TweenLite.set(r,{zIndex:18});punchgs.TweenLite.set(s,{autoAlpha:0,zIndex:20});var a=0;if(r.index()!=s.index()&&n.firststart!=1){a=z(r,n)}if(r.data("saveperformance")!="on")a=0;setTimeout(function(){e.trigger("restarttimer");L(e,n,s,r,o,u)},a)};var L=function(n,r,i,s,o,u){function x(){e.each(d,function(e,t){if(t[0]==h||t[8]==h){f=t[1];p=t[2];g=y}y=y+1})}if(i.data("differentissplayed")=="prepared"){i.data("differentissplayed","done");i.data("transition",i.data("savedtransition"));i.data("slotamount",i.data("savedslotamount"));i.data("masterspeed",i.data("savedmasterspeed"))}if(i.data("fstransition")!=t&&i.data("differentissplayed")!="done"){i.data("savedtransition",i.data("transition"));i.data("savedslotamount",i.data("slotamount"));i.data("savedmasterspeed",i.data("masterspeed"));i.data("transition",i.data("fstransition"));i.data("slotamount",i.data("fsslotamount"));i.data("masterspeed",i.data("fsmasterspeed"));i.data("differentissplayed","prepared")}n.find(".active-revslide").removeClass(".active-revslide");i.addClass("active-revslide");if(i.data("transition")==t)i.data("transition","random");var f=0,l=i.data("transition").split(","),c=i.data("nexttransid")==t?-1:i.data("nexttransid");if(i.data("randomtransition")=="on")c=Math.round(Math.random()*l.length);else c=c+1;if(c==l.length)c=0;i.data("nexttransid",c);var h=l[c];if(r.ie){if(h=="boxfade")h="boxslide";if(h=="slotfade-vertical")h="slotzoom-vertical";if(h=="slotfade-horizontal")h="slotzoom-horizontal"}if(a(8)){h=11}var p=0;if(r.parallax=="scroll"&&r.parallaxFirstGo==t){r.parallaxFirstGo=true;tt(n,r);setTimeout(function(){tt(n,r)},210);setTimeout(function(){tt(n,r)},420)}if(h=="slidehorizontal"){h="slideleft";if(r.leftarrowpressed==1)h="slideright"}if(h=="slidevertical"){h="slideup";if(r.leftarrowpressed==1)h="slidedown"}if(h=="parallaxhorizontal"){h="parallaxtoleft";if(r.leftarrowpressed==1)h="parallaxtoright"}if(h=="parallaxvertical"){h="parallaxtotop";if(r.leftarrowpressed==1)h="parallaxtobottom"}var d=[["boxslide",0,1,10,0,"box",false,null,0],["boxfade",1,0,10,0,"box",false,null,1],["slotslide-horizontal",2,0,0,200,"horizontal",true,false,2],["slotslide-vertical",3,0,0,200,"vertical",true,false,3],["curtain-1",4,3,0,0,"horizontal",true,true,4],["curtain-2",5,3,0,0,"horizontal",true,true,5],["curtain-3",6,3,25,0,"horizontal",true,true,6],["slotzoom-horizontal",7,0,0,400,"horizontal",true,true,7],["slotzoom-vertical",8,0,0,0,"vertical",true,true,8],["slotfade-horizontal",9,0,0,500,"horizontal",true,null,9],["slotfade-vertical",10,0,0,500,"vertical",true,null,10],["fade",11,0,1,300,"horizontal",true,null,11],["slideleft",12,0,1,0,"horizontal",true,true,12],["slideup",13,0,1,0,"horizontal",true,true,13],["slidedown",14,0,1,0,"horizontal",true,true,14],["slideright",15,0,1,0,"horizontal",true,true,15],["papercut",16,0,0,600,"",null,null,16],["3dcurtain-horizontal",17,0,20,100,"vertical",false,true,17],["3dcurtain-vertical",18,0,10,100,"horizontal",false,true,18],["cubic",19,0,20,600,"horizontal",false,true,19],["cube",19,0,20,600,"horizontal",false,true,20],["flyin",20,0,4,600,"vertical",false,true,21],["turnoff",21,0,1,1600,"horizontal",false,true,22],["incube",22,0,20,200,"horizontal",false,true,23],["cubic-horizontal",23,0,20,500,"vertical",false,true,24],["cube-horizontal",23,0,20,500,"vertical",false,true,25],["incube-horizontal",24,0,20,500,"vertical",false,true,26],["turnoff-vertical",25,0,1,200,"horizontal",false,true,27],["fadefromright",12,1,1,0,"horizontal",true,true,28],["fadefromleft",15,1,1,0,"horizontal",true,true,29],["fadefromtop",14,1,1,0,"horizontal",true,true,30],["fadefrombottom",13,1,1,0,"horizontal",true,true,31],["fadetoleftfadefromright",12,2,1,0,"horizontal",true,true,32],["fadetorightfadetoleft",15,2,1,0,"horizontal",true,true,33],["fadetobottomfadefromtop",14,2,1,0,"horizontal",true,true,34],["fadetotopfadefrombottom",13,2,1,0,"horizontal",true,true,35],["parallaxtoright",12,3,1,0,"horizontal",true,true,36],["parallaxtoleft",15,3,1,0,"horizontal",true,true,37],["parallaxtotop",14,3,1,0,"horizontal",true,true,38],["parallaxtobottom",13,3,1,0,"horizontal",true,true,39],["scaledownfromright",12,4,1,0,"horizontal",true,true,40],["scaledownfromleft",15,4,1,0,"horizontal",true,true,41],["scaledownfromtop",14,4,1,0,"horizontal",true,true,42],["scaledownfrombottom",13,4,1,0,"horizontal",true,true,43],["zoomout",13,5,1,0,"horizontal",true,true,44],["zoomin",13,6,1,0,"horizontal",true,true,45],["notransition",26,0,1,0,"horizontal",true,null,46]];var v=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];var m=[16,17,18,19,20,21,22,23,24,25,26,27];var f=0;var p=1;var g=0;var y=0;var w=new Array;if(u.data("kenburns")=="on"){if(h=="boxslide"||h==0||h=="boxfade"||h==1||h=="papercut"||h==16)h=11;Q(n,r,true,true)}if(h=="random"){h=Math.round(Math.random()*d.length-1);if(h>d.length-1)h=d.length-1}if(h=="random-static"){h=Math.round(Math.random()*v.length-1);if(h>v.length-1)h=v.length-1;h=v[h]}if(h=="random-premium"){h=Math.round(Math.random()*m.length-1);if(h>m.length-1)h=m.length-1;h=m[h]}var E=[12,13,14,15,16,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];if(r.isJoomla==true&&window.MooTools!=t&&E.indexOf(h)!=-1){var S=Math.round(Math.random()*(m.length-2))+1;if(S>m.length-1)S=m.length-1;if(S==0)S=1;h=m[S]}x();if(a(8)&&f>15&&f<28){h=Math.round(Math.random()*v.length-1);if(h>v.length-1)h=v.length-1;h=v[h];y=0;x()}var T=-1;if(r.leftarrowpressed==1||r.act>r.next)T=1;r.leftarrowpressed=0;if(f>26)f=26;if(f<0)f=0;var N=300;if(i.data("masterspeed")!=t&&i.data("masterspeed")>99&&i.data("masterspeed")<r.delay)N=i.data("masterspeed");if(i.data("masterspeed")!=t&&i.data("masterspeed")>r.delay)N=r.delay;w=d[g];n.parent().find(".bullet").each(function(){var t=e(this),n=t.index();t.removeClass("selected");if(r.navigationArrows=="withbullet"||r.navigationArrows=="nexttobullets")n=t.index()-1;if(n==r.next)t.addClass("selected")});var C=new punchgs.TimelineLite({onComplete:function(){A(n,r,u,o,i,s,C)}});C.add(punchgs.TweenLite.set(u.find(".defaultimg"),{opacity:0}));C.pause();if(i.data("slotamount")==t||i.data("slotamount")<1){r.slots=Math.round(Math.random()*12+4);if(h=="boxslide")r.slots=Math.round(Math.random()*6+3);else if(h=="flyin")r.slots=Math.round(Math.random()*4+1)}else{r.slots=i.data("slotamount")}if(i.data("rotate")==t)r.rotate=0;else if(i.data("rotate")==999)r.rotate=Math.round(Math.random()*360);else r.rotate=i.data("rotate");if(!e.support.transition||r.ie||r.ie9)r.rotate=0;if(r.firststart==1)r.firststart=0;N=N+w[4];if((f==4||f==5||f==6)&&r.slots<3)r.slots=3;if(w[3]!=0)r.slots=Math.min(r.slots,w[3]);if(f==9)r.slots=r.width/20;if(f==10)r.slots=r.height/20;if(w[7]!=null)b(o,r,w[7],w[5]);if(w[6]!=null)b(u,r,w[6],w[5]);if(f==0){var k=Math.ceil(r.height/r.sloth);var L=0;u.find(".slotslide").each(function(t){var n=e(this);L=L+1;if(L==k)L=0;C.add(punchgs.TweenLite.from(n,N/600,{opacity:0,top:0-r.sloth,left:0-r.slotw,rotation:r.rotate,force3D:"auto",ease:punchgs.Power2.easeOut}),(t*15+L*30)/1500)})}if(f==1){var O,M=0;u.find(".slotslide").each(function(t){var n=e(this),i=Math.random()*N+300,s=Math.random()*500+200;if(i+s>O){O=s+s;M=t}C.add(punchgs.TweenLite.from(n,i/1e3,{autoAlpha:0,force3D:"auto",rotation:r.rotate,ease:punchgs.Power2.easeInOut}),s/1e3)})}if(f==2){var _=new punchgs.TimelineLite;o.find(".slotslide").each(function(){var t=e(this);_.add(punchgs.TweenLite.to(t,N/1e3,{left:r.slotw,force3D:"auto",rotation:0-r.rotate}),0);C.add(_,0)});u.find(".slotslide").each(function(){var t=e(this);_.add(punchgs.TweenLite.from(t,N/1e3,{left:0-r.slotw,force3D:"auto",rotation:r.rotate}),0);C.add(_,0)})}if(f==3){var _=new punchgs.TimelineLite;o.find(".slotslide").each(function(){var t=e(this);_.add(punchgs.TweenLite.to(t,N/1e3,{top:r.sloth,rotation:r.rotate,force3D:"auto",transformPerspective:600}),0);C.add(_,0)});u.find(".slotslide").each(function(){var t=e(this);_.add(punchgs.TweenLite.from(t,N/1e3,{top:0-r.sloth,rotation:r.rotate,ease:punchgs.Power2.easeOut,force3D:"auto",transformPerspective:600}),0);C.add(_,0)})}if(f==4||f==5){setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);var D=N/1e3,P=D,_=new punchgs.TimelineLite;o.find(".slotslide").each(function(t){var n=e(this);var i=t*D/r.slots;if(f==5)i=(r.slots-t-1)*D/r.slots/1.5;_.add(punchgs.TweenLite.to(n,D*3,{transformPerspective:600,force3D:"auto",top:0+r.height,opacity:.5,rotation:r.rotate,ease:punchgs.Power2.easeInOut,delay:i}),0);C.add(_,0)});u.find(".slotslide").each(function(t){var n=e(this);var i=t*D/r.slots;if(f==5)i=(r.slots-t-1)*D/r.slots/1.5;_.add(punchgs.TweenLite.from(n,D*3,{top:0-r.height,opacity:.5,rotation:r.rotate,force3D:"auto",ease:punchgs.Power2.easeInOut,delay:i}),0);C.add(_,0)})}if(f==6){if(r.slots<2)r.slots=2;if(r.slots%2)r.slots=r.slots+1;var _=new punchgs.TimelineLite;setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);o.find(".slotslide").each(function(t){var n=e(this);if(t+1<r.slots/2)var i=(t+2)*90;else var i=(2+r.slots-t)*90;_.add(punchgs.TweenLite.to(n,(N+i)/1e3,{top:0+r.height,opacity:1,force3D:"auto",rotation:r.rotate,ease:punchgs.Power2.easeInOut}),0);C.add(_,0)});u.find(".slotslide").each(function(t){var n=e(this);if(t+1<r.slots/2)var i=(t+2)*90;else var i=(2+r.slots-t)*90;_.add(punchgs.TweenLite.from(n,(N+i)/1e3,{top:0-r.height,opacity:1,force3D:"auto",rotation:r.rotate,ease:punchgs.Power2.easeInOut}),0);C.add(_,0)})}if(f==7){N=N*2;if(N>r.delay)N=r.delay;var _=new punchgs.TimelineLite;setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);o.find(".slotslide").each(function(){var t=e(this).find("div");_.add(punchgs.TweenLite.to(t,N/1e3,{left:0-r.slotw/2+"px",top:0-r.height/2+"px",width:r.slotw*2+"px",height:r.height*2+"px",opacity:0,rotation:r.rotate,force3D:"auto",ease:punchgs.Power2.easeOut}),0);C.add(_,0)});u.find(".slotslide").each(function(t){var n=e(this).find("div");_.add(punchgs.TweenLite.fromTo(n,N/1e3,{left:0,top:0,opacity:0,transformPerspective:600},{left:0-t*r.slotw+"px",ease:punchgs.Power2.easeOut,force3D:"auto",top:0+"px",width:r.width,height:r.height,opacity:1,rotation:0,delay:.1}),0);C.add(_,0)})}if(f==8){N=N*3;if(N>r.delay)N=r.delay;var _=new punchgs.TimelineLite;o.find(".slotslide").each(function(){var t=e(this).find("div");_.add(punchgs.TweenLite.to(t,N/1e3,{left:0-r.width/2+"px",top:0-r.sloth/2+"px",width:r.width*2+"px",height:r.sloth*2+"px",force3D:"auto",opacity:0,rotation:r.rotate}),0);C.add(_,0)});u.find(".slotslide").each(function(t){var n=e(this).find("div");_.add(punchgs.TweenLite.fromTo(n,N/1e3,{left:0,top:0,opacity:0,force3D:"auto"},{left:0+"px",top:0-t*r.sloth+"px",width:u.find(".defaultimg").data("neww")+"px",height:u.find(".defaultimg").data("newh")+"px",opacity:1,rotation:0}),0);C.add(_,0)})}if(f==9||f==10){var H=0;u.find(".slotslide").each(function(t){var n=e(this);H++;C.add(punchgs.TweenLite.fromTo(n,N/1e3,{autoAlpha:0,force3D:"auto",transformPerspective:600},{autoAlpha:1,ease:punchgs.Power2.easeInOut,delay:t*5/1e3}),0)})}if(f==11||f==26){var H=0;if(f==26)N=0;u.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.from(n,N/1e3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power2.easeInOut}),0)})}if(f==12||f==13||f==14||f==15){N=N;if(N>r.delay)N=r.delay;setTimeout(function(){punchgs.TweenLite.set(o.find(".defaultimg"),{autoAlpha:0})},100);var B=r.width,F=r.height,I=u.find(".slotslide"),q=0,R=0,U=1,z=1,W=1,X=punchgs.Power2.easeInOut,V=punchgs.Power2.easeInOut,$=N/1e3,J=$;if(r.fullWidth=="on"||r.fullScreen=="on"){B=I.width();F=I.height()}if(f==12)q=B;else if(f==15)q=0-B;else if(f==13)R=F;else if(f==14)R=0-F;if(p==1)U=0;if(p==2)U=0;if(p==3){X=punchgs.Power2.easeInOut;V=punchgs.Power1.easeInOut;$=N/1200}if(p==4||p==5)z=.6;if(p==6)z=1.4;if(p==5||p==6){W=1.4;U=0;B=0;F=0;q=0;R=0}if(p==6)W=.6;var K=0;C.add(punchgs.TweenLite.from(I,$,{left:q,top:R,scale:W,opacity:U,rotation:r.rotate,ease:V,force3D:"auto"}),0);var G=o.find(".slotslide");if(p==4||p==5){B=0;F=0}if(p!=1)switch(f){case 12:C.add(punchgs.TweenLite.to(G,J,{left:0-B+"px",force3D:"auto",scale:z,opacity:U,rotation:r.rotate,ease:X}),0);break;case 15:C.add(punchgs.TweenLite.to(G,J,{left:B+"px",force3D:"auto",scale:z,opacity:U,rotation:r.rotate,ease:X}),0);break;case 13:C.add(punchgs.TweenLite.to(G,J,{top:0-F+"px",force3D:"auto",scale:z,opacity:U,rotation:r.rotate,ease:X}),0);break;case 14:C.add(punchgs.TweenLite.to(G,J,{top:F+"px",force3D:"auto",scale:z,opacity:U,rotation:r.rotate,ease:X}),0);break}}if(f==16){var _=new punchgs.TimelineLite;C.add(punchgs.TweenLite.set(s,{position:"absolute","z-index":20}),0);C.add(punchgs.TweenLite.set(i,{position:"absolute","z-index":15}),0);s.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>');s.find(".tp-half-one").clone(true).appendTo(s).addClass("tp-half-two");s.find(".tp-half-two").removeClass("tp-half-one");var B=r.width,F=r.height;if(r.autoHeight=="on")F=n.height();s.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:'+B+"px;height:"+F+'px;"></div>');s.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:'+B+"px;height:"+F+'px;"></div>');s.find(".tp-half-two .defaultimg").css({position:"absolute",top:"-50%"});s.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>');C.add(punchgs.TweenLite.set(s.find(".tp-half-two"),{width:B,height:F,overflow:"hidden",zIndex:15,position:"absolute",top:F/2,left:"0px",transformPerspective:600,transformOrigin:"center bottom"}),0);C.add(punchgs.TweenLite.set(s.find(".tp-half-one"),{width:B,height:F/2,overflow:"visible",zIndex:10,position:"absolute",top:"0px",left:"0px",transformPerspective:600,transformOrigin:"center top"}),0);var Y=s.find(".defaultimg"),Z=Math.round(Math.random()*20-10),et=Math.round(Math.random()*20-10),nt=Math.round(Math.random()*20-10),rt=Math.random()*.4-.2,it=Math.random()*.4-.2,st=Math.random()*1+1,ot=Math.random()*1+1,ut=Math.random()*.3+.3;C.add(punchgs.TweenLite.set(s.find(".tp-half-one"),{overflow:"hidden"}),0);C.add(punchgs.TweenLite.fromTo(s.find(".tp-half-one"),N/800,{width:B,height:F/2,position:"absolute",top:"0px",left:"0px",force3D:"auto",transformOrigin:"center top"},{scale:st,rotation:Z,y:0-F-F/4,autoAlpha:0,ease:punchgs.Power2.easeInOut}),0);C.add(punchgs.TweenLite.fromTo(s.find(".tp-half-two"),N/800,{width:B,height:F,overflow:"hidden",position:"absolute",top:F/2,left:"0px",force3D:"auto",transformOrigin:"center bottom"},{scale:ot,rotation:et,y:F+F/4,ease:punchgs.Power2.easeInOut,autoAlpha:0,onComplete:function(){punchgs.TweenLite.set(s,{position:"absolute","z-index":15});punchgs.TweenLite.set(i,{position:"absolute","z-index":20});if(s.find(".tp-half-one").length>0){s.find(".tp-half-one .defaultimg").unwrap();s.find(".tp-half-one .slotholder").unwrap()}s.find(".tp-half-two").remove()}}),0);_.add(punchgs.TweenLite.set(u.find(".defaultimg"),{autoAlpha:1}),0);if(s.html()!=null)C.add(punchgs.TweenLite.fromTo(i,(N-200)/1e3,{scale:ut,x:r.width/4*rt,y:F/4*it,rotation:nt,force3D:"auto",transformOrigin:"center center",ease:punchgs.Power2.easeOut},{autoAlpha:1,scale:1,x:0,y:0,rotation:0}),0);C.add(_,0)}if(f==17){u.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/800,{opacity:0,rotationY:0,scale:.9,rotationX:-110,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{opacity:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:punchgs.Power3.easeOut,delay:t*.06}),0)})}if(f==18){u.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/500,{autoAlpha:0,rotationY:310,scale:.9,rotationX:10,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{autoAlpha:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:punchgs.Power3.easeOut,delay:t*.06}),0)})}if(f==19||f==22){var _=new punchgs.TimelineLite;C.add(punchgs.TweenLite.set(s,{zIndex:20}),0);C.add(punchgs.TweenLite.set(i,{zIndex:20}),0);setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);var at=i.css("z-index"),ft=s.css("z-index"),lt=90,U=1,ct="center center ";if(T==1)lt=-90;if(f==19){ct=ct+"-"+r.height/2;U=0}else{ct=ct+r.height/2}punchgs.TweenLite.set(n,{transformStyle:"flat",backfaceVisibility:"hidden",transformPerspective:600});u.find(".slotslide").each(function(t){var n=e(this);_.add(punchgs.TweenLite.fromTo(n,N/1e3,{transformStyle:"flat",backfaceVisibility:"hidden",left:0,rotationY:r.rotate,z:10,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationX:lt},{left:0,rotationY:0,top:0,z:0,scale:1,force3D:"auto",rotationX:0,delay:t*50/1e3,ease:punchgs.Power2.easeInOut}),0);_.add(punchgs.TweenLite.to(n,.1,{autoAlpha:1,delay:t*50/1e3}),0);C.add(_)});o.find(".slotslide").each(function(t){var n=e(this);var i=-90;if(T==1)i=90;_.add(punchgs.TweenLite.fromTo(n,N/1e3,{transformStyle:"flat",backfaceVisibility:"hidden",autoAlpha:1,rotationY:0,top:0,z:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationX:0},{autoAlpha:1,rotationY:r.rotate,top:0,z:10,scale:1,rotationX:i,delay:t*50/1e3,force3D:"auto",ease:punchgs.Power2.easeInOut}),0);C.add(_)})}if(f==20){setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);var at=i.css("z-index"),ft=s.css("z-index");if(T==1){var ht=-r.width;var lt=70;var ct="left center -"+r.height/2}else{var ht=r.width;var lt=-70;var ct="right center -"+r.height/2}u.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/1500,{left:ht,rotationX:40,z:-600,opacity:U,top:0,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationY:lt},{left:0,delay:t*50/1e3,ease:punchgs.Power2.easeInOut}),0);C.add(punchgs.TweenLite.fromTo(n,N/1e3,{rotationX:40,z:-600,opacity:U,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationY:lt},{rotationX:0,opacity:1,top:0,z:0,scale:1,rotationY:0,delay:t*50/1e3,ease:punchgs.Power2.easeInOut}),0);C.add(punchgs.TweenLite.to(n,.1,{opacity:1,force3D:"auto",delay:t*50/1e3+N/2e3}),0)});o.find(".slotslide").each(function(t){var n=e(this);if(T!=1){var i=-r.width;var s=70;var o="left center -"+r.height/2}else{var i=r.width;var s=-70;var o="right center -"+r.height/2}C.add(punchgs.TweenLite.fromTo(n,N/1e3,{opacity:1,rotationX:0,top:0,z:0,scale:1,left:0,force3D:"auto",transformPerspective:600,transformOrigin:o,rotationY:0},{opacity:1,rotationX:40,top:0,z:-600,left:i,force3D:"auto",scale:.8,rotationY:s,delay:t*50/1e3,ease:punchgs.Power2.easeInOut}),0);C.add(punchgs.TweenLite.to(n,.1,{force3D:"auto",opacity:0,delay:t*50/1e3+(N/1e3-N/1e4)}),0)})}if(f==21||f==25){setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);var at=i.css("z-index"),ft=s.css("z-index"),lt=90,ht=-r.width,pt=-lt;if(T==1){if(f==25){var ct="center top 0";lt=r.rotate}else{var ct="left center 0";pt=r.rotate}}else{ht=r.width;lt=-90;if(f==25){var ct="center bottom 0";pt=-lt;lt=r.rotate}else{var ct="right center 0";pt=r.rotate}}u.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/1e3,{left:0,transformStyle:"flat",rotationX:pt,z:0,autoAlpha:0,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationY:lt},{left:0,rotationX:0,top:0,z:0,autoAlpha:1,scale:1,rotationY:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),0)});if(T!=1){ht=-r.width;lt=90;if(f==25){ct="center top 0";pt=-lt;lt=r.rotate}else{ct="left center 0";pt=r.rotate}}else{ht=r.width;lt=-90;if(f==25){ct="center bottom 0";pt=-lt;lt=r.rotate}else{ct="right center 0";pt=r.rotate}}o.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/1e3,{left:0,transformStyle:"flat",rotationX:0,z:0,autoAlpha:1,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationY:0},{left:0,rotationX:pt,top:0,z:0,autoAlpha:1,force3D:"auto",scale:1,rotationY:lt,ease:punchgs.Power1.easeInOut}),0)})}if(f==23||f==24){setTimeout(function(){o.find(".defaultimg").css({opacity:0})},100);var at=i.css("z-index"),ft=s.css("z-index"),lt=-90,U=1,dt=0;if(T==1)lt=90;if(f==23){var ct="center center -"+r.width/2;U=0}else var ct="center center "+r.width/2;punchgs.TweenLite.set(n,{transformStyle:"preserve-3d",backfaceVisibility:"hidden",perspective:2500});u.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/1e3,{left:dt,rotationX:r.rotate,force3D:"auto",opacity:U,top:0,scale:1,transformPerspective:600,transformOrigin:ct,rotationY:lt},{left:0,rotationX:0,autoAlpha:1,top:0,z:0,scale:1,rotationY:0,delay:t*50/500,ease:punchgs.Power2.easeInOut}),0)});lt=90;if(T==1)lt=-90;o.find(".slotslide").each(function(t){var n=e(this);C.add(punchgs.TweenLite.fromTo(n,N/1e3,{left:0,autoAlpha:1,rotationX:0,top:0,z:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:ct,rotationY:0},{left:dt,autoAlpha:1,rotationX:r.rotate,top:0,scale:1,rotationY:lt,delay:t*50/500,ease:punchgs.Power2.easeInOut}),0)})}C.pause();j(i,r,null,C);punchgs.TweenLite.to(i,.001,{autoAlpha:1});var vt={};vt.slideIndex=r.next+1;vt.slide=i;n.trigger("revolution.slide.onchange",vt);setTimeout(function(){n.trigger("revolution.slide.onafterswap")},N);n.trigger("revolution.slide.onvideostop")};var A=function(e,t,n,r,i,s,o){punchgs.TweenLite.to(n.find(".defaultimg"),.001,{autoAlpha:1,onComplete:function(){E(e,t,i)}});if(i.index()!=s.index()){punchgs.TweenLite.to(s,.2,{autoAlpha:0,onComplete:function(){E(e,t,s)}})}t.act=t.next;if(t.navigationType=="thumb")rt(e);if(n.data("kenburns")=="on"){Q(e,t)}e.find(".current-sr-slide-visible").removeClass("current-sr-slide-visible");i.addClass("current-sr-slide-visible");if(t.parallax=="scroll"||t.parallax=="scroll+mouse"||t.parallax=="mouse+scroll"){tt(e,t)}o.clear()};var O=function(t){var n=t.target.getVideoEmbedCode();var r=e("#"+n.split('id="')[1].split('"')[0]);var i=r.closest(".tp-simpleresponsive");var s=r.parent().data("player");if(t.data==YT.PlayerState.PLAYING){var o=i.find(".tp-bannertimer");var u=o.data("opt");if(r.closest(".tp-caption").data("volume")=="mute")s.mute();u.videoplaying=true;i.trigger("stoptimer");i.trigger("revolution.slide.onvideoplay")}else{var o=i.find(".tp-bannertimer");var u=o.data("opt");if(t.data!=-1&&t.data!=3){u.videoplaying=false;i.trigger("starttimer");i.trigger("revolution.slide.onvideostop")}if(t.data==0&&u.nextslideatend==true)u.container.revnext();else{u.videoplaying=false;i.trigger("starttimer");i.trigger("revolution.slide.onvideostop")}}};var M=function(e,t,n){if(e.addEventListener)e.addEventListener(t,n,false);else e.attachEvent(t,n,false)};var _=function(t,n){var r=$f(t),i=e("#"+t),s=i.closest(".tp-simpleresponsive"),o=i.closest(".tp-caption");setTimeout(function(){r.addEvent("ready",function(t){if(n)r.api("play");r.addEvent("play",function(e){var t=s.find(".tp-bannertimer");var n=t.data("opt");n.videoplaying=true;s.trigger("stoptimer");if(o.data("volume")=="mute")r.api("setVolume","0")});r.addEvent("finish",function(e){var t=s.find(".tp-bannertimer");var n=t.data("opt");n.videoplaying=false;s.trigger("starttimer");s.trigger("revolution.slide.onvideoplay");if(n.nextslideatend==true)n.container.revnext()});r.addEvent("pause",function(e){var t=s.find(".tp-bannertimer");var n=t.data("opt");n.videoplaying=false;s.trigger("starttimer");s.trigger("revolution.slide.onvideostop")});o.find(".tp-thumb-image").click(function(){punchgs.TweenLite.to(e(this),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});r.api("play")})})},150)};var D=function(e,n){var r=n.width();var i=n.height();var s=e.data("mediaAspect");if(s==t)s=1;var o=r/i;e.css({position:"absolute"});var u=e.find("video");if(o<s){punchgs.TweenLite.to(e,1e-4,{width:i*s,force3D:"auto",top:0,left:0-(i*s-r)/2,height:i})}else{punchgs.TweenLite.to(e,1e-4,{width:r,force3D:"auto",top:0-(r/s-i)/2,left:0,height:r/s})}};var P=function(){var e=new Object;e.x=0;e.y=0;e.rotationX=0;e.rotationY=0;e.rotationZ=0;e.scale=1;e.scaleX=1;e.scaleY=1;e.skewX=0;e.skewY=0;e.opacity=0;e.transformOrigin="center, center";e.transformPerspective=400;e.rotation=0;return e};var H=function(t,n){var r=n.split(";");e.each(r,function(e,n){n=n.split(":");var r=n[0],i=n[1];if(r=="rotationX")t.rotationX=parseInt(i,0);if(r=="rotationY")t.rotationY=parseInt(i,0);if(r=="rotationZ")t.rotationZ=parseInt(i,0);if(r=="rotationZ")t.rotation=parseInt(i,0);if(r=="scaleX")t.scaleX=parseFloat(i);if(r=="scaleY")t.scaleY=parseFloat(i);if(r=="opacity")t.opacity=parseFloat(i);if(r=="skewX")t.skewX=parseInt(i,0);if(r=="skewY")t.skewY=parseInt(i,0);if(r=="x")t.x=parseInt(i,0);if(r=="y")t.y=parseInt(i,0);if(r=="z")t.z=parseInt(i,0);if(r=="transformOrigin")t.transformOrigin=i.toString();if(r=="transformPerspective")t.transformPerspective=parseInt(i,0)});return t};var B=function(t){var n=t.split("animation:");var r=new Object;r.animation=H(P(),n[1]);var i=n[0].split(";");e.each(i,function(e,t){t=t.split(":");var n=t[0],i=t[1];if(n=="typ")r.typ=i;if(n=="speed")r.speed=parseInt(i,0)/1e3;if(n=="start")r.start=parseInt(i,0)/1e3;if(n=="elementdelay")r.elementdelay=parseFloat(i);if(n=="ease")r.ease=i});return r};var j=function(n,r,i,s){function o(){}function u(){}if(n.data("ctl")==t){n.data("ctl",new punchgs.TimelineLite)}var f=n.data("ctl"),l=0,c=0,h=n.find(".tp-caption"),p=r.container.find(".tp-static-layers").find(".tp-caption");f.pause();e.each(p,function(e,t){h.push(t)});h.each(function(n){var s=i,f=-1,h=e(this);if(h.hasClass("tp-static-layer")){var p=h.data("startslide"),d=h.data("endslide");if(p==-1||p=="-1")h.data("startslide",0);if(d==-1||d=="-1")h.data("endslide",r.slideamount);if(p==0&&d==r.slideamount-1)h.data("endslide",r.slideamount+1);p=h.data("startslide"),d=h.data("endslide");if(!h.hasClass("tp-is-shown")){if(p<=r.next&&d>=r.next||p==r.next||d==r.next){h.addClass("tp-is-shown");f=1}else{f=0}}else{if(d==r.next||p>r.next||d<r.next){f=2}else{f=0}}}l=r.width/2-r.startwidth*r.bw/2;var v=r.bw;var m=r.bh;if(r.fullScreen=="on")c=r.height/2-r.startheight*r.bh/2;if(r.autoHeight=="on"||r.minHeight!=t&&r.minHeight>0)c=r.container.height()/2-r.startheight*r.bh/2;if(c<0)c=0;var g=0;if(r.width<r.hideCaptionAtLimit&&h.data("captionhidden")=="on"){h.addClass("tp-hidden-caption");g=1}else{if(r.width<r.hideAllCaptionAtLimit||r.width<r.hideAllCaptionAtLilmit){h.addClass("tp-hidden-caption");g=1}else{h.removeClass("tp-hidden-caption")}}if(g==0){if(h.data("linktoslide")!=t&&!h.hasClass("hasclicklistener")){h.addClass("hasclicklistener");h.css({cursor:"pointer"});if(h.data("linktoslide")!="no"){h.click(function(){var t=e(this);var n=t.data("linktoslide");if(n!="next"&&n!="prev"){r.container.data("showus",n);r.container.parent().find(".tp-rightarrow").click()}else if(n=="next")r.container.parent().find(".tp-rightarrow").click();else if(n=="prev")r.container.parent().find(".tp-leftarrow").click()})}}if(l<0)l=0;if(h.hasClass("tp-videolayer")||h.find("iframe").length>0||h.find("video").length>0){var y="iframe"+Math.round(Math.random()*1e5+1),b=h.data("videowidth"),w=h.data("videoheight"),E=h.data("videoattributes"),S=h.data("ytid"),x=h.data("vimeoid"),T=h.data("videpreload"),N=h.data("videomp4"),C=h.data("videowebm"),k=h.data("videoogv"),L=h.data("videocontrols"),A="http",j=h.data("videoloop")=="loop"?"loop":h.data("videoloop")=="loopandnoslidestop"?"loop":"";if(h.data("thumbimage")!=t&&h.data("videoposter")==t)h.data("videoposter",h.data("thumbimage"));if(S!=t&&String(S).length>1&&h.find("iframe").length==0){A="https";if(L=="none"){E=E.replace("controls=1","controls=0");if(E.toLowerCase().indexOf("controls")==-1)E=E+"&controls=0"}h.append('<iframe style="visible:hidden" src="'+A+"://www.youtube.com/embed/"+S+"?"+E+'" width="'+b+'" height="'+w+'" style="width:'+b+"px;height:"+w+'px"></iframe>')}if(x!=t&&String(x).length>1&&h.find("iframe").length==0){if(location.protocol==="https:")A="https";h.append('<iframe style="visible:hidden" src="'+A+"://player.vimeo.com/video/"+x+"?"+E+'" width="'+b+'" height="'+w+'" style="width:'+b+"px;height:"+w+'px"></iframe>')}if((N!=t||C!=t)&&h.find("video").length==0){if(L!="controls")L="";var I='<video style="visible:hidden" class="" '+j+' preload="'+T+'" width="'+b+'" height="'+w+'"';if(h.data("videoposter")!=t)if(h.data("videoposter")!=t)I=I+'poster="'+h.data("videoposter")+'">';if(C!=t&&F().toLowerCase()=="firefox")I=I+'<source src="'+C+'" type="video/webm" />';if(N!=t)I=I+'<source src="'+N+'" type="video/mp4" />';if(k!=t)I=I+'<source src="'+k+'" type="video/ogg" />';I=I+"</video>";h.append(I);if(L=="controls")h.append('<div class="tp-video-controls">'+'<div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div>'+'<div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div>'+'<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div>'+'<div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>'+'<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'+"</div>")}var z=false;if(h.data("autoplayonlyfirsttime")==true||h.data("autoplayonlyfirsttime")=="true"||h.data("autoplay")==true){h.data("autoplay",true);z=true}if(h.data("videoposter")!=t&&h.data("videoposter").length>2&&h.data("autoplay")!=true&&!s){if(h.find(".tp-thumb-image").length==0){h.append('<div class="tp-thumb-image" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url('+h.data("videoposter")+'); background-size:cover; background-position:center center"></div>')}else{punchgs.TweenLite.set(h.find(".tp-thumb-image"),{autoAlpha:1})}}h.find("iframe").each(function(){var n=e(this);punchgs.TweenLite.to(n,.1,{autoAlpha:1,zIndex:0,transformStyle:"preserve-3d",z:0,rotationX:0,force3D:"auto"});if(J()){var s=n.attr("src");n.attr("src","");n.attr("src",s)}r.nextslideatend=h.data("nextslideatend");if(n.attr("src").toLowerCase().indexOf("youtube")>=0){if(!n.hasClass("HasListener")){try{n.attr("id",y);var o;var u=setInterval(function(){if(YT!=t)if(typeof YT.Player!=t&&typeof YT.Player!="undefined"){o=new YT.Player(y,{events:{onStateChange:O,onReady:function(n){var r=n.target.getVideoEmbedCode(),i=e("#"+r.split('id="')[1].split('"')[0]),s=i.closest(".tp-caption"),u=s.data("videorate"),a=s.data("videostart");if(u!=t)n.target.setPlaybackRate(parseFloat(u));if(!J()&&s.data("autoplay")==true||z){s.data("timerplay",setTimeout(function(){n.target.playVideo()},s.data("start")))}s.find(".tp-thumb-image").click(function(){punchgs.TweenLite.to(e(this),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});if(!J()){o.playVideo()}})}}})}n.addClass("HasListener");h.data("player",o);clearInterval(u)},100)}catch(a){}}else{if(!i){var o=h.data("player");if(h.data("forcerewind")=="on"&&!J())o.seekTo(0);if(!J()&&h.data("autoplay")==true||z){h.data("timerplay",setTimeout(function(){o.playVideo()},h.data("start")))}}}}else if(n.attr("src").toLowerCase().indexOf("vimeo")>=0){if(!n.hasClass("HasListener")){n.addClass("HasListener");n.attr("id",y);var f=n.attr("src");var l={},c=f,p=/([^&=]+)=([^&]*)/g,d;while(d=p.exec(c)){l[decodeURIComponent(d[1])]=decodeURIComponent(d[2])}if(l["player_id"]!=t)f=f.replace(l["player_id"],y);else f=f+"&player_id="+y;try{f=f.replace("api=0","api=1")}catch(a){}f=f+"&api=1";n.attr("src",f);var o=h.find("iframe")[0];var v=setInterval(function(){if($f!=t){if(typeof $f(y).api!=t&&typeof $f(y).api!="undefined"){$f(o).addEvent("ready",function(){_(y,z)});clearInterval(v)}}},100)}else{if(!i){if(!J()&&(h.data("autoplay")==true||h.data("forcerewind")=="on")){var n=h.find("iframe");var m=n.attr("id");var g=$f(m);if(h.data("forcerewind")=="on")g.api("seekTo",0);h.data("timerplay",setTimeout(function(){if(h.data("autoplay")==true)g.api("play")},h.data("start")))}}}}});if(J()&&h.data("disablevideoonmobile")==1||a(8))h.find("video").remove();if(h.find("video").length>0){h.find("video").each(function(n){var i=this,s=e(this);if(!s.parent().hasClass("html5vid"))s.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:auto;height:auto"></div>');var o=s.parent();M(i,"loadedmetadata",function(e){e.data("metaloaded",1)}(o));clearInterval(o.data("interval"));o.data("interval",setInterval(function(){if(o.data("metaloaded")==1||i.duration!=NaN){clearInterval(o.data("interval"));if(!o.hasClass("HasListener")){o.addClass("HasListener");if(h.data("dottedoverlay")!="none"&&h.data("dottedoverlay")!=t)if(h.find(".tp-dottedoverlay").length!=1)o.append('<div class="tp-dottedoverlay '+h.data("dottedoverlay")+'"></div>');if(s.attr("control")==t){if(o.find(".tp-video-play-button").length==0)o.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><div class="tp-revstop"></div></div>');o.parent().find("video, .tp-poster, .tp-thumb-image, .tp-video-play-button").click(function(){if(o.hasClass("videoisplaying")){i.pause()}else{i.play();punchgs.TweenLite.to(o.parent().find(".tp-poster, .tp-thumb-image"),.2,{autoAlpha:0})}})}if(h.data("forcecover")==1||h.hasClass("fullscreenvideo")){if(h.data("forcecover")==1){D(o,r.container);o.addClass("fullcoveredvideo");h.addClass("fullcoveredvideo")}o.css({width:"100%",height:"100%"})}var e=h.find(".tp-vid-play-pause")[0],n=h.find(".tp-vid-mute")[0],u=h.find(".tp-vid-full-screen")[0],a=h.find(".tp-seek-bar")[0],f=h.find(".tp-volume-bar")[0];if(e!=t){M(e,"click",function(){if(i.paused==true)i.play();else i.pause()});M(n,"click",function(){if(i.muted==false){i.muted=true;n.innerHTML="Unmute"}else{i.muted=false;n.innerHTML="Mute"}});M(u,"click",function(){if(i.requestFullscreen){i.requestFullscreen()}else if(i.mozRequestFullScreen){i.mozRequestFullScreen()}else if(i.webkitRequestFullscreen){i.webkitRequestFullscreen()}});M(a,"change",function(){var e=i.duration*(a.value/100);i.currentTime=e});M(i,"timeupdate",function(){var e=100/i.duration*i.currentTime;a.value=e});M(a,"mousedown",function(){i.pause()});M(a,"mouseup",function(){i.play()});M(f,"change",function(){i.volume=f.value})}M(i,"play",function(){if(h.data("volume")=="mute")i.muted=true;o.addClass("videoisplaying");if(h.data("videoloop")=="loopandnoslidestop"){r.videoplaying=false;r.container.trigger("starttimer");r.container.trigger("revolution.slide.onvideostop")}else{r.videoplaying=true;r.container.trigger("stoptimer");r.container.trigger("revolution.slide.onvideoplay")}var e=h.find(".tp-vid-play-pause")[0],n=h.find(".tp-vid-mute")[0];if(e!=t)e.innerHTML="Pause";if(n!=t&&i.muted)n.innerHTML="Unmute"});M(i,"pause",function(){o.removeClass("videoisplaying");r.videoplaying=false;r.container.trigger("starttimer");r.container.trigger("revolution.slide.onvideostop");var e=h.find(".tp-vid-play-pause")[0];if(e!=t)e.innerHTML="Play"});M(i,"ended",function(){o.removeClass("videoisplaying");r.videoplaying=false;r.container.trigger("starttimer");r.container.trigger("revolution.slide.onvideostop");if(r.nextslideatend==true)r.container.revnext()})}var l=false;if(h.data("autoplayonlyfirsttime")==true||h.data("autoplayonlyfirsttime")=="true")l=true;var c=16/9;if(h.data("aspectratio")=="4:3")c=4/3;o.data("mediaAspect",c);if(o.closest(".tp-caption").data("forcecover")==1){D(o,r.container);o.addClass("fullcoveredvideo")}s.css({display:"block"});r.nextslideatend=h.data("nextslideatend");if(h.data("forcerewind")=="on"&&!o.hasClass("videoisplaying"))if(i.currentTime>0)i.currentTime=0;if(h.data("autoplay")==true||l==true){if(h.data("videoloop")=="loopandnoslidestop"){r.videoplaying=false;r.container.trigger("starttimer");r.container.trigger("revolution.slide.onvideostop")}else{r.videoplaying=true;r.container.trigger("stoptimer");r.container.trigger("revolution.slide.onvideoplay")}if(h.data("forcerewind")=="on"&&!o.hasClass("videoisplaying"))if(i.currentTime>0)i.currentTime=0;if(h.data("volume")=="mute")i.muted=true;o.data("timerplay",setTimeout(function(){if(h.data("forcerewind")=="on"&&!o.hasClass("videoisplaying"))if(i.currentTime>0)i.currentTime=0;if(h.data("volume")=="mute")i.muted=true;i.play()},10+h.data("start")))}if(o.data("ww")==t)o.data("ww",s.attr("width"));if(o.data("hh")==t)o.data("hh",s.attr("height"));if(!h.hasClass("fullscreenvideo")&&h.data("forcecover")==1){try{o.width(o.data("ww")*r.bw);o.height(o.data("hh")*r.bh)}catch(p){}}clearInterval(o.data("interval"))}}),100)})}if(h.data("autoplay")==true){setTimeout(function(){if(h.data("videoloop")!="loopandnoslidestop"){r.videoplaying=true;r.container.trigger("stoptimer")}},200);if(h.data("videoloop")!="loopandnoslidestop"){r.videoplaying=true;r.container.trigger("stoptimer")}if(h.data("autoplayonlyfirsttime")==true||h.data("autoplayonlyfirsttime")=="true"){h.data("autoplay",false);h.data("autoplayonlyfirsttime",false)}}}var V=0;var $=0;if(h.find("img").length>0){var K=h.find("img");if(K.width()==0)K.css({width:"auto"});if(K.height()==0)K.css({height:"auto"});if(K.data("ww")==t&&K.width()>0)K.data("ww",K.width());if(K.data("hh")==t&&K.height()>0)K.data("hh",K.height());var Q=K.data("ww");var G=K.data("hh");if(Q==t)Q=0;if(G==t)G=0;K.width(Q*r.bw);K.height(G*r.bh);V=K.width();$=K.height()}else{if(h.find("iframe").length>0||h.find("video").length>0){var Y=false,K=h.find("iframe");if(K.length==0){K=h.find("video");Y=true}K.css({display:"block"});if(h.data("ww")==t)h.data("ww",K.width());if(h.data("hh")==t)h.data("hh",K.height());var Q=h.data("ww"),G=h.data("hh");var Z=h;if(Z.data("fsize")==t)Z.data("fsize",parseInt(Z.css("font-size"),0)||0);if(Z.data("pt")==t)Z.data("pt",parseInt(Z.css("paddingTop"),0)||0);if(Z.data("pb")==t)Z.data("pb",parseInt(Z.css("paddingBottom"),0)||0);if(Z.data("pl")==t)Z.data("pl",parseInt(Z.css("paddingLeft"),0)||0);if(Z.data("pr")==t)Z.data("pr",parseInt(Z.css("paddingRight"),0)||0);if(Z.data("mt")==t)Z.data("mt",parseInt(Z.css("marginTop"),0)||0);if(Z.data("mb")==t)Z.data("mb",parseInt(Z.css("marginBottom"),0)||0);if(Z.data("ml")==t)Z.data("ml",parseInt(Z.css("marginLeft"),0)||0);if(Z.data("mr")==t)Z.data("mr",parseInt(Z.css("marginRight"),0)||0);if(Z.data("bt")==t)Z.data("bt",parseInt(Z.css("borderTop"),0)||0);if(Z.data("bb")==t)Z.data("bb",parseInt(Z.css("borderBottom"),0)||0);if(Z.data("bl")==t)Z.data("bl",parseInt(Z.css("borderLeft"),0)||0);if(Z.data("br")==t)Z.data("br",parseInt(Z.css("borderRight"),0)||0);if(Z.data("lh")==t)Z.data("lh",parseInt(Z.css("lineHeight"),0)||0);if(Z.data("lh")=="auto")Z.data("lh",Z.data("fsize")+4);var et=r.width,tt=r.height;if(et>r.startwidth)et=r.startwidth;if(tt>r.startheight)tt=r.startheight;if(!h.hasClass("fullscreenvideo"))h.css({"font-size":Z.data("fsize")*r.bw+"px","padding-top":Z.data("pt")*r.bh+"px","padding-bottom":Z.data("pb")*r.bh+"px","padding-left":Z.data("pl")*r.bw+"px","padding-right":Z.data("pr")*r.bw+"px","margin-top":Z.data("mt")*r.bh+"px","margin-bottom":Z.data("mb")*r.bh+"px","margin-left":Z.data("ml")*r.bw+"px","margin-right":Z.data("mr")*r.bw+"px","border-top":Z.data("bt")*r.bh+"px","border-bottom":Z.data("bb")*r.bh+"px","border-left":Z.data("bl")*r.bw+"px","border-right":Z.data("br")*r.bw+"px","line-height":Z.data("lh")*r.bh+"px",height:G*r.bh+"px"});else{l=0;c=0;h.data("x",0);h.data("y",0);var nt=r.height;if(r.autoHeight=="on")nt=r.container.height();h.css({width:r.width,height:nt})}if(Y==false){K.width(Q*r.bw);K.height(G*r.bh)}else if(h.data("forcecover")!=1&&!h.hasClass("fullscreenvideo")){K.width(Q*r.bw);K.height(G*r.bh)}V=K.width();$=K.height()}else{h.find(".tp-resizeme, .tp-resizeme *").each(function(){q(e(this),r)});if(h.hasClass("tp-resizeme")){h.find("*").each(function(){q(e(this),r)})}q(h,r);$=h.outerHeight(true);V=h.outerWidth(true);var rt=h.outerHeight();var it=h.css("backgroundColor");h.find(".frontcorner").css({borderWidth:rt+"px",left:0-rt+"px",borderRight:"0px solid transparent",borderTopColor:it});h.find(".frontcornertop").css({borderWidth:rt+"px",left:0-rt+"px",borderRight:"0px solid transparent",borderBottomColor:it});h.find(".backcorner").css({borderWidth:rt+"px",right:0-rt+"px",borderLeft:"0px solid transparent",borderBottomColor:it});h.find(".backcornertop").css({borderWidth:rt+"px",right:0-rt+"px",borderLeft:"0px solid transparent",borderTopColor:it})}}if(r.fullScreenAlignForce=="on"){l=0;c=0}if(h.data("voffset")==t)h.data("voffset",0);if(h.data("hoffset")==t)h.data("hoffset",0);var st=h.data("voffset")*v;var ot=h.data("hoffset")*v;var ut=r.startwidth*v;var at=r.startheight*v;if(r.fullScreenAlignForce=="on"){ut=r.container.width();at=r.container.height()}if(h.data("x")=="center"||h.data("xcenter")=="center"){h.data("xcenter","center");h.data("x",ut/2-h.outerWidth(true)/2+ot)}if(h.data("x")=="left"||h.data("xleft")=="left"){h.data("xleft","left");h.data("x",0/v+ot)}if(h.data("x")=="right"||h.data("xright")=="right"){h.data("xright","right");h.data("x",(ut-h.outerWidth(true)+ot)/v)}if(h.data("y")=="center"||h.data("ycenter")=="center"){h.data("ycenter","center");h.data("y",at/2-h.outerHeight(true)/2+st)}if(h.data("y")=="top"||h.data("ytop")=="top"){h.data("ytop","top");h.data("y",0/r.bh+st)}if(h.data("y")=="bottom"||h.data("ybottom")=="bottom"){h.data("ybottom","bottom");h.data("y",(at-h.outerHeight(true)+st)/v)}if(h.data("start")==t)h.data("start",1e3);var ft=h.data("easing");if(ft==t)ft="punchgs.Power1.easeOut";var lt=h.data("start")/1e3,ct=h.data("speed")/1e3;if(h.data("x")=="center"||h.data("xcenter")=="center")var ht=h.data("x")+l;else{var ht=v*h.data("x")+l}if(h.data("y")=="center"||h.data("ycenter")=="center")var pt=h.data("y")+c;else{var pt=r.bh*h.data("y")+c}punchgs.TweenLite.set(h,{top:pt,left:ht,overwrite:"auto"});if(f==0)s=true;if(h.data("timeline")!=t&&!s){if(f!=2)h.data("timeline").gotoAndPlay(0);s=true}if(!s){if(h.data("timeline")!=t){}var dt=new punchgs.TimelineLite({smoothChildTiming:true,onStart:u});dt.pause();if(r.fullScreenAlignForce=="on"){}var vt=h;if(h.data("mySplitText")!=t)h.data("mySplitText").revert();if(h.data("splitin")=="chars"||h.data("splitin")=="words"||h.data("splitin")=="lines"||h.data("splitout")=="chars"||h.data("splitout")=="words"||h.data("splitout")=="lines"){if(h.find("a").length>0)h.data("mySplitText",new punchgs.SplitText(h.find("a"),{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}));else if(h.find(".tp-layer-inner-rotation").length>0)h.data("mySplitText",new punchgs.SplitText(h.find(".tp-layer-inner-rotation"),{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}));else h.data("mySplitText",new punchgs.SplitText(h,{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}));h.addClass("splitted")}if(h.data("splitin")=="chars")vt=h.data("mySplitText").chars;if(h.data("splitin")=="words")vt=h.data("mySplitText").words;if(h.data("splitin")=="lines")vt=h.data("mySplitText").lines;var mt=P();var gt=P();if(h.data("repeat")!=t)repeatV=h.data("repeat");if(h.data("yoyo")!=t)yoyoV=h.data("yoyo");if(h.data("repeatdelay")!=t)repeatdelayV=h.data("repeatdelay");var yt=h.attr("class");if(yt.match("customin"))mt=H(mt,h.data("customin"));else if(yt.match("randomrotate")){mt.scale=Math.random()*3+1;mt.rotation=Math.round(Math.random()*200-100);mt.x=Math.round(Math.random()*200-100);mt.y=Math.round(Math.random()*200-100)}else if(yt.match("lfr")||yt.match("skewfromright"))mt.x=15+r.width;else if(yt.match("lfl")||yt.match("skewfromleft"))mt.x=-15-V;else if(yt.match("sfl")||yt.match("skewfromleftshort"))mt.x=-50;else if(yt.match("sfr")||yt.match("skewfromrightshort"))mt.x=50;else if(yt.match("lft"))mt.y=-25-$;else if(yt.match("lfb"))mt.y=25+r.height;else if(yt.match("sft"))mt.y=-50;else if(yt.match("sfb"))mt.y=50;if(yt.match("skewfromright")||h.hasClass("skewfromrightshort"))mt.skewX=-85;else if(yt.match("skewfromleft")||h.hasClass("skewfromleftshort"))mt.skewX=85;if(yt.match("fade")||yt.match("sft")||yt.match("sfl")||yt.match("sfb")||yt.match("skewfromleftshort")||yt.match("sfr")||yt.match("skewfromrightshort"))mt.opacity=0;if(F().toLowerCase()=="safari"){}var bt=h.data("elementdelay")==t?0:h.data("elementdelay");gt.ease=mt.ease=h.data("easing")==t?punchgs.Power1.easeInOut:h.data("easing");mt.data=new Object;mt.data.oldx=mt.x;mt.data.oldy=mt.y;gt.data=new Object;gt.data.oldx=gt.x;gt.data.oldy=gt.y;mt.x=mt.x*v;mt.y=mt.y*v;var wt=new punchgs.TimelineLite;if(f!=2){if(yt.match("customin")){if(vt!=h)dt.add(punchgs.TweenLite.set(h,{force3D:"auto",opacity:1,scaleX:1,scaleY:1,rotationX:0,rotationY:0,rotationZ:0,skewX:0,skewY:0,z:0,x:0,y:0,visibility:"visible",delay:0,overwrite:"all"}));mt.visibility="hidden";gt.visibility="visible";gt.overwrite="all";gt.opacity=1;gt.onComplete=o();gt.delay=lt;gt.force3D="auto";dt.add(wt.staggerFromTo(vt,ct,mt,gt,bt),"frame0")}else{mt.visibility="visible";mt.transformPerspective=600;if(vt!=h)dt.add(punchgs.TweenLite.set(h,{force3D:"auto",opacity:1,scaleX:1,scaleY:1,rotationX:0,rotationY:0,rotationZ:0,skewX:0,skewY:0,z:0,x:0,y:0,visibility:"visible",delay:0,overwrite:"all"}));gt.visibility="visible";gt.delay=lt;gt.onComplete=o();gt.opacity=1;gt.force3D="auto";if(yt.match("randomrotate")&&vt!=h){for(var n=0;n<vt.length;n++){var Et=new Object;var St=new Object;e.extend(Et,mt);e.extend(St,gt);mt.scale=Math.random()*3+1;mt.rotation=Math.round(Math.random()*200-100);mt.x=Math.round(Math.random()*200-100);mt.y=Math.round(Math.random()*200-100);if(n!=0)St.delay=lt+n*bt;dt.append(punchgs.TweenLite.fromTo(vt[n],ct,Et,St),"frame0")}}else dt.add(wt.staggerFromTo(vt,ct,mt,gt,bt),"frame0")}}h.data("timeline",dt);var xt=new Array;if(h.data("frames")!=t){var Tt=h.data("frames");Tt=Tt.replace(/\s+/g,"");Tt=Tt.replace("{","");var Nt=Tt.split("}");e.each(Nt,function(e,t){if(t.length>0){var n=B(t);W(h,r,n,"frame"+(e+10),v)}})}dt=h.data("timeline");if(h.data("end")!=t&&(f==-1||f==2)){X(h,r,h.data("end")/1e3,mt,"frame99",v)}else{if(f==-1||f==2){X(h,r,999999,mt,"frame99",v)}else{X(h,r,999999,mt,"frame99",v)}}dt=h.data("timeline");h.data("timeline",dt);R(h,v);dt.resume()}}if(s){U(h);R(h,v);if(h.data("timeline")!=t){var Ct=h.data("timeline").getTweensOf();e.each(Ct,function(e,n){if(n.vars.data!=t){var r=n.vars.data.oldx*v;var i=n.vars.data.oldy*v;if(n.progress()!=1&&n.progress()!=0){try{n.vars.x=r;n.vary.y=i}catch(s){}}else{if(n.progress()==1){punchgs.TweenLite.set(n.target,{x:r,y:i})}}}})}}});var d=e("body").find("#"+r.container.attr("id")).find(".tp-bannertimer");d.data("opt",r);if(s!=t)setTimeout(function(){s.resume()},30)};var F=function(){var e=navigator.appName,t=navigator.userAgent,n;var r=t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(r&&(n=t.match(/version\/([\.\d]+)/i))!=null)r[2]=n[1];r=r?[r[1],r[2]]:[e,navigator.appVersion,"-?"];return r[0]};var I=function(){var e=navigator.appName,t=navigator.userAgent,n;var r=t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(r&&(n=t.match(/version\/([\.\d]+)/i))!=null)r[2]=n[1];r=r?[r[1],r[2]]:[e,navigator.appVersion,"-?"];return r[1]};var q=function(e,n){if(e.data("fsize")==t)e.data("fsize",parseInt(e.css("font-size"),0)||0);if(e.data("pt")==t)e.data("pt",parseInt(e.css("paddingTop"),0)||0);if(e.data("pb")==t)e.data("pb",parseInt(e.css("paddingBottom"),0)||0);if(e.data("pl")==t)e.data("pl",parseInt(e.css("paddingLeft"),0)||0);if(e.data("pr")==t)e.data("pr",parseInt(e.css("paddingRight"),0)||0);if(e.data("mt")==t)e.data("mt",parseInt(e.css("marginTop"),0)||0);if(e.data("mb")==t)e.data("mb",parseInt(e.css("marginBottom"),0)||0);if(e.data("ml")==t)e.data("ml",parseInt(e.css("marginLeft"),0)||0);if(e.data("mr")==t)e.data("mr",parseInt(e.css("marginRight"),0)||0);if(e.data("bt")==t)e.data("bt",parseInt(e.css("borderTopWidth"),0)||0);if(e.data("bb")==t)e.data("bb",parseInt(e.css("borderBottomWidth"),0)||0);if(e.data("bl")==t)e.data("bl",parseInt(e.css("borderLeftWidth"),0)||0);if(e.data("br")==t)e.data("br",parseInt(e.css("borderRightWidth"),0)||0);if(e.data("ls")==t)e.data("ls",parseInt(e.css("letterSpacing"),0)||0);if(e.data("lh")==t)e.data("lh",parseInt(e.css("lineHeight"),0)||"auto");if(e.data("minwidth")==t)e.data("minwidth",parseInt(e.css("minWidth"),0)||0);if(e.data("minheight")==t)e.data("minheight",parseInt(e.css("minHeight"),0)||0);if(e.data("maxwidth")==t)e.data("maxwidth",parseInt(e.css("maxWidth"),0)||"none");if(e.data("maxheight")==t)e.data("maxheight",parseInt(e.css("maxHeight"),0)||"none");if(e.data("wii")==t)e.data("wii",parseInt(e.css("width"),0)||0);if(e.data("hii")==t)e.data("hii",parseInt(e.css("height"),0)||0);if(e.data("wan")==t)e.data("wan",e.css("-webkit-transition"));if(e.data("moan")==t)e.data("moan",e.css("-moz-animation-transition"));if(e.data("man")==t)e.data("man",e.css("-ms-animation-transition"));if(e.data("ani")==t)e.data("ani",e.css("transition"));if(e.data("lh")=="auto")e.data("lh",e.data("fsize")+4);if(!e.hasClass("tp-splitted")){e.css("-webkit-transition","none");e.css("-moz-transition","none");e.css("-ms-transition","none");e.css("transition","none");punchgs.TweenLite.set(e,{fontSize:Math.round(e.data("fsize")*n.bw)+"px",letterSpacing:Math.floor(e.data("ls")*n.bw)+"px",paddingTop:Math.round(e.data("pt")*n.bh)+"px",paddingBottom:Math.round(e.data("pb")*n.bh)+"px",paddingLeft:Math.round(e.data("pl")*n.bw)+"px",paddingRight:Math.round(e.data("pr")*n.bw)+"px",marginTop:e.data("mt")*n.bh+"px",marginBottom:e.data("mb")*n.bh+"px",marginLeft:e.data("ml")*n.bw+"px",marginRight:e.data("mr")*n.bw+"px",borderTopWidth:Math.round(e.data("bt")*n.bh)+"px",borderBottomWidth:Math.round(e.data("bb")*n.bh)+"px",borderLeftWidth:Math.round(e.data("bl")*n.bw)+"px",borderRightWidth:Math.round(e.data("br")*n.bw)+"px",lineHeight:Math.round(e.data("lh")*n.bh)+"px",minWidth:e.data("minwidth")*n.bw+"px",minHeight:e.data("minheight")*n.bh+"px",overwrite:"auto"});setTimeout(function(){e.css("-webkit-transition",e.data("wan"));e.css("-moz-transition",e.data("moan"));e.css("-ms-transition",e.data("man"));e.css("transition",e.data("ani"))},30);if(e.data("maxheight")!="none")e.css({maxHeight:e.data("maxheight")*n.bh+"px"});if(e.data("maxwidth")!="none")e.css({maxWidth:e.data("maxwidth")*n.bw+"px"})}};var R=function(n,r){n.find(".rs-pendulum").each(function(){var n=e(this);if(n.data("timeline")==t){n.data("timeline",new punchgs.TimelineLite);var i=n.data("startdeg")==t?-20:n.data("startdeg"),s=n.data("enddeg")==t?20:n.data("enddeg"),o=n.data("speed")==t?2:n.data("speed"),u=n.data("origin")==t?"50% 50%":n.data("origin"),a=n.data("easing")==t?punchgs.Power2.easeInOut:n.data("ease");i=i*r;s=s*r;n.data("timeline").append(new punchgs.TweenLite.fromTo(n,o,{force3D:"auto",rotation:i,transformOrigin:u},{rotation:s,ease:a}));n.data("timeline").append(new punchgs.TweenLite.fromTo(n,o,{force3D:"auto",rotation:s,transformOrigin:u},{rotation:i,ease:a,onComplete:function(){n.data("timeline").restart()}}))}});n.find(".rs-rotate").each(function(){var n=e(this);if(n.data("timeline")==t){n.data("timeline",new punchgs.TimelineLite);var i=n.data("startdeg")==t?0:n.data("startdeg"),s=n.data("enddeg")==t?360:n.data("enddeg");speed=n.data("speed")==t?2:n.data("speed"),origin=n.data("origin")==t?"50% 50%":n.data("origin"),easing=n.data("easing")==t?punchgs.Power2.easeInOut:n.data("easing");i=i*r;s=s*r;n.data("timeline").append(new punchgs.TweenLite.fromTo(n,speed,{force3D:"auto",rotation:i,transformOrigin:origin},{rotation:s,ease:easing,onComplete:function(){n.data("timeline").restart()}}))}});n.find(".rs-slideloop").each(function(){var n=e(this);if(n.data("timeline")==t){n.data("timeline",new punchgs.TimelineLite);var i=n.data("xs")==t?0:n.data("xs"),s=n.data("ys")==t?0:n.data("ys"),o=n.data("xe")==t?0:n.data("xe"),u=n.data("ye")==t?0:n.data("ye"),a=n.data("speed")==t?2:n.data("speed"),f=n.data("easing")==t?punchgs.Power2.easeInOut:n.data("easing");i=i*r;s=s*r;o=o*r;u=u*r;n.data("timeline").append(new punchgs.TweenLite.fromTo(n,a,{force3D:"auto",x:i,y:s},{x:o,y:u,ease:f}));n.data("timeline").append(new punchgs.TweenLite.fromTo(n,a,{force3D:"auto",x:o,y:u},{x:i,y:s,onComplete:function(){n.data("timeline").restart()}}))}});n.find(".rs-pulse").each(function(){var n=e(this);if(n.data("timeline")==t){n.data("timeline",new punchgs.TimelineLite);var r=n.data("zoomstart")==t?0:n.data("zoomstart"),i=n.data("zoomend")==t?0:n.data("zoomend"),s=n.data("speed")==t?2:n.data("speed"),o=n.data("easing")==t?punchgs.Power2.easeInOut:n.data("easing");n.data("timeline").append(new punchgs.TweenLite.fromTo(n,s,{force3D:"auto",scale:r},{scale:i,ease:o}));n.data("timeline").append(new punchgs.TweenLite.fromTo(n,s,{force3D:"auto",scale:i},{scale:r,onComplete:function(){n.data("timeline").restart()}}))}});n.find(".rs-wave").each(function(){var n=e(this);if(n.data("timeline")==t){n.data("timeline",new punchgs.TimelineLite);var i=n.data("angle")==t?10:n.data("angle"),s=n.data("radius")==t?10:n.data("radius"),o=n.data("speed")==t?-20:n.data("speed"),u=n.data("origin")==t?-20:n.data("origin");i=i*r;s=s*r;var a={a:0,ang:i,element:n,unit:s};n.data("timeline").append(new punchgs.TweenLite.fromTo(a,o,{a:360},{a:0,force3D:"auto",ease:punchgs.Linear.easeNone,onUpdate:function(){var e=a.a*(Math.PI/180);punchgs.TweenLite.to(a.element,.1,{force3D:"auto",x:Math.cos(e)*a.unit,y:a.unit*(1-Math.sin(e))})},onComplete:function(){n.data("timeline").restart()}}))}})};var U=function(n){n.find(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function(){var n=e(this);if(n.data("timeline")!=t){n.data("timeline").pause();n.data("timeline",null)}})};var z=function(n,r){var i=0;var s=n.find(".tp-caption"),o=r.container.find(".tp-static-layers").find(".tp-caption");e.each(o,function(e,t){s.push(t)});s.each(function(n){var s=-1,o=e(this);if(o.hasClass("tp-static-layer")){if(o.data("startslide")==-1||o.data("startslide")=="-1")o.data("startslide",0);if(o.data("endslide")==-1||o.data("endslide")=="-1")o.data("endslide",r.slideamount);if(o.hasClass("tp-is-shown")){if(o.data("startslide")>r.next||o.data("endslide")<r.next){s=2;o.removeClass("tp-is-shown")}else{s=0}}else{s=2}}if(s!=0){U(o);if(o.find("iframe").length>0){punchgs.TweenLite.to(o.find("iframe"),.2,{autoAlpha:0});if(J())o.find("iframe").remove();try{var u=o.find("iframe");var a=u.attr("id");var f=$f(a);f.api("pause");clearTimeout(o.data("timerplay"))}catch(l){}try{var c=o.data("player");c.stopVideo();clearTimeout(o.data("timerplay"))}catch(l){}}if(o.find("video").length>0){try{o.find("video").each(function(t){var n=e(this).parent();var r=n.attr("id");clearTimeout(n.data("timerplay"));var i=this;i.pause()})}catch(l){}}try{var h=o.data("timeline");var p=h.getLabelTime("frame99");var d=h.time();if(p>d){var v=h.getTweensOf(o);e.each(v,function(e,t){if(e!=0)t.pause()});if(o.css("opacity")!=0){var m=o.data("endspeed")==t?o.data("speed"):o.data("endspeed");if(m>i)i=m;h.play("frame99")}else h.progress(1,false)}}catch(l){}}});return i};var W=function(e,n,r,i,s){var o=e.data("timeline");var u=new punchgs.TimelineLite;var a=e;if(r.typ=="chars")a=e.data("mySplitText").chars;else if(r.typ=="words")a=e.data("mySplitText").words;else if(r.typ=="lines")a=e.data("mySplitText").lines;r.animation.ease=r.ease;if(r.animation.rotationZ!=t)r.animation.rotation=r.animation.rotationZ;r.animation.data=new Object;r.animation.data.oldx=r.animation.x;r.animation.data.oldy=r.animation.y;r.animation.x=r.animation.x*s;r.animation.y=r.animation.y*s;o.add(u.staggerTo(a,r.speed,r.animation,r.elementdelay),r.start);o.addLabel(i,r.start);e.data("timeline",o)};var X=function(e,n,r,i,s,o){var u=e.data("timeline"),a=new punchgs.TimelineLite;var f=P(),l=e.data("endspeed")==t?e.data("speed"):e.data("endspeed"),c=e.attr("class");f.ease=e.data("endeasing")==t?punchgs.Power1.easeInOut:e.data("endeasing");l=l/1e3;if(c.match("ltr")||c.match("ltl")||c.match("str")||c.match("stl")||c.match("ltt")||c.match("ltb")||c.match("stt")||c.match("stb")||c.match("skewtoright")||c.match("skewtorightshort")||c.match("skewtoleft")||c.match("skewtoleftshort")||c.match("fadeout")||c.match("randomrotateout")){if(c.match("skewtoright")||c.match("skewtorightshort"))f.skewX=35;else if(c.match("skewtoleft")||c.match("skewtoleftshort"))f.skewX=-35;if(c.match("ltr")||c.match("skewtoright"))f.x=n.width+60;else if(c.match("ltl")||c.match("skewtoleft"))f.x=0-(n.width+60);else if(c.match("ltt"))f.y=0-(n.height+60);else if(c.match("ltb"))f.y=n.height+60;else if(c.match("str")||c.match("skewtorightshort")){f.x=50;f.opacity=0}else if(c.match("stl")||c.match("skewtoleftshort")){f.x=-50;f.opacity=0}else if(c.match("stt")){f.y=-50;f.opacity=0}else if(c.match("stb")){f.y=50;f.opacity=0}else if(c.match("randomrotateout")){f.x=Math.random()*n.width;f.y=Math.random()*n.height;f.scale=Math.random()*2+.3;f.rotation=Math.random()*360-180;f.opacity=0}else if(c.match("fadeout")){f.opacity=0}if(c.match("skewtorightshort"))f.x=270;else if(c.match("skewtoleftshort"))f.x=-270;f.data=new Object;f.data.oldx=f.x;f.data.oldy=f.y;f.x=f.x*o;f.y=f.y*o;f.overwrite="auto";var h=e;var h=e;if(e.data("splitout")=="chars")h=e.data("mySplitText").chars;else if(e.data("splitout")=="words")h=e.data("mySplitText").words;else if(e.data("splitout")=="lines")h=e.data("mySplitText").lines;var p=e.data("endelementdelay")==t?0:e.data("endelementdelay");u.add(a.staggerTo(h,l,f,p),r)}else if(e.hasClass("customout")){f=H(f,e.data("customout"));var h=e;if(e.data("splitout")=="chars")h=e.data("mySplitText").chars;else if(e.data("splitout")=="words")h=e.data("mySplitText").words;else if(e.data("splitout")=="lines")h=e.data("mySplitText").lines;var p=e.data("endelementdelay")==t?0:e.data("endelementdelay");f.onStart=function(){punchgs.TweenLite.set(e,{transformPerspective:f.transformPerspective,transformOrigin:f.transformOrigin,overwrite:"auto"})};f.data=new Object;f.data.oldx=f.x;f.data.oldy=f.y;f.x=f.x*o;f.y=f.y*o;u.add(a.staggerTo(h,l,f,p),r)}else{i.delay=0;u.add(punchgs.TweenLite.to(e,l,i),r)}u.addLabel(s,r);e.data("timeline",u)};var V=function(t,n){t.children().each(function(){try{e(this).die("click")}catch(t){}try{e(this).die("mouseenter")}catch(t){}try{e(this).die("mouseleave")}catch(t){}try{e(this).unbind("hover")}catch(t){}});try{t.die("click","mouseenter","mouseleave")}catch(r){}clearInterval(n.cdint);t=null};var $=function(n,r){r.cd=0;r.loop=0;if(r.stopAfterLoops!=t&&r.stopAfterLoops>-1)r.looptogo=r.stopAfterLoops;else r.looptogo=9999999;if(r.stopAtSlide!=t&&r.stopAtSlide>-1)r.lastslidetoshow=r.stopAtSlide;else r.lastslidetoshow=999;r.stopLoop="off";if(r.looptogo==0)r.stopLoop="on";if(r.slideamount>1&&!(r.stopAfterLoops==0&&r.stopAtSlide==1)){var i=n.find(".tp-bannertimer");n.on("stoptimer",function(){var t=e(this).find(".tp-bannertimer");t.data("tween").pause();if(r.hideTimerBar=="on")t.css({visibility:"hidden"})});n.on("starttimer",function(){if(r.conthover!=1&&r.videoplaying!=true&&r.width>r.hideSliderAtLimit&&r.bannertimeronpause!=true&&r.overnav!=true)if(r.stopLoop=="on"&&r.next==r.lastslidetoshow-1||r.noloopanymore==1)r.noloopanymore=1;else{i.css({visibility:"visible"});i.data("tween").resume()}if(r.hideTimerBar=="on")i.css({visibility:"hidden"})});n.on("restarttimer",function(){var t=e(this).find(".tp-bannertimer");if(r.stopLoop=="on"&&r.next==r.lastslidetoshow-1||r.noloopanymore==1)r.noloopanymore=1;else{t.css({visibility:"visible"});t.data("tween").kill();t.data("tween",punchgs.TweenLite.fromTo(t,r.delay/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:s,delay:1}))}if(r.hideTimerBar=="on")t.css({visibility:"hidden"})});n.on("nulltimer",function(){i.data("tween").pause(0);if(r.hideTimerBar=="on")i.css({visibility:"hidden"})});var s=function(){if(e("body").find(n).length==0){V(n,r);clearInterval(r.cdint)}n.trigger("revolution.slide.slideatend");if(n.data("conthover-changed")==1){r.conthover=n.data("conthover");n.data("conthover-changed",0)}r.act=r.next;r.next=r.next+1;if(r.next>n.find(">ul >li").length-1){r.next=0;r.looptogo=r.looptogo-1;if(r.looptogo<=0){r.stopLoop="on"}}if(r.stopLoop=="on"&&r.next==r.lastslidetoshow-1){n.find(".tp-bannertimer").css({visibility:"hidden"});n.trigger("revolution.slide.onstop");r.noloopanymore=1}else{i.data("tween").restart()}N(n,r)};i.data("tween",punchgs.TweenLite.fromTo(i,r.delay/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:s,delay:1}));i.data("opt",r);n.hover(function(){if(r.onHoverStop=="on"&&!J()){n.trigger("stoptimer");n.trigger("revolution.slide.onpause");var i=n.find(">ul >li:eq("+r.next+") .slotholder");i.find(".defaultimg").each(function(){var n=e(this);if(n.data("kenburn")!=t){n.data("kenburn").pause()}})}},function(){if(n.data("conthover")!=1){n.trigger("revolution.slide.onresume");n.trigger("starttimer");var i=n.find(">ul >li:eq("+r.next+") .slotholder");i.find(".defaultimg").each(function(){var n=e(this);if(n.data("kenburn")!=t){n.data("kenburn").play()}})}})}};var J=function(){var e=["android","webos","iphone","ipad","blackberry","Android","webos",,"iPod","iPhone","iPad","Blackberry","BlackBerry"];var t=false;for(var n in e){if(navigator.userAgent.split(e[n]).length>1){t=true}}return t};var K=function(e,t,n){var r=t.data("owidth");var i=t.data("oheight");if(r/i>n.width/n.height){var s=n.container.width()/r;var o=i*s;var u=o/n.container.height()*e;e=e*(100/u);u=100;e=e;return e+"% "+u+"%"+" 1"}else{var s=n.container.width()/r;var o=i*s;var u=o/n.container.height()*e;return e+"% "+u+"%"}};var Q=function(n,r,i,s){try{var o=n.find(">ul:first-child >li:eq("+r.act+")")}catch(u){var o=n.find(">ul:first-child >li:eq(1)")}r.lastslide=r.act;var f=n.find(">ul:first-child >li:eq("+r.next+")"),l=f.find(".slotholder"),c=l.data("bgposition"),h=l.data("bgpositionend"),p=l.data("zoomstart")/100,d=l.data("zoomend")/100,v=l.data("rotationstart"),m=l.data("rotationend"),g=l.data("bgfit"),y=l.data("bgfitend"),b=l.data("easeme"),w=l.data("duration")/1e3,E=100;if(g==t)g=100;if(y==t)y=100;var S=g,x=y;g=K(g,l,r);y=K(y,l,r);E=K(100,l,r);if(p==t)p=1;if(d==t)d=1;if(v==t)v=0;if(m==t)m=0;if(p<1)p=1;if(d<1)d=1;var T=new Object;T.w=parseInt(E.split(" ")[0],0),T.h=parseInt(E.split(" ")[1],0);var N=false;if(E.split(" ")[2]=="1"){N=true}l.find(".defaultimg").each(function(){var t=e(this);if(l.find(".kenburnimg").length==0)l.append('<div class="kenburnimg" style="position:absolute;z-index:1;width:100%;height:100%;top:0px;left:0px;"><img src="'+t.attr("src")+'" style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;position:absolute;width:'+T.w+"%;height:"+T.h+'%;"></div>');else{l.find(".kenburnimg img").css({width:T.w+"%",height:T.h+"%"})}var n=l.find(".kenburnimg img");var i=G(r,c,g,n,N),o=G(r,h,y,n,N);if(N){i.w=S/100;o.w=x/100}if(s){punchgs.TweenLite.set(n,{autoAlpha:0,transformPerspective:1200,transformOrigin:"0% 0%",top:0,left:0,scale:i.w,x:i.x,y:i.y});var u=i.w,f=u*n.width()-r.width,p=u*n.height()-r.height,d=Math.abs(i.x/f*100),v=Math.abs(i.y/p*100);if(p==0)v=0;if(f==0)d=0;t.data("bgposition",d+"% "+v+"%");if(!a(8))t.data("currotate",Y(n));if(!a(8))t.data("curscale",T.w*u+"%  "+(T.h*u+"%"));l.find(".kenburnimg").remove()}else t.data("kenburn",punchgs.TweenLite.fromTo(n,w,{autoAlpha:1,force3D:punchgs.force3d,transformOrigin:"0% 0%",top:0,left:0,scale:i.w,x:i.x,y:i.y},{autoAlpha:1,rotationZ:m,ease:b,x:o.x,y:o.y,scale:o.w,onUpdate:function(){var e=n[0]._gsTransform.scaleX;var i=e*n.width()-r.width,s=e*n.height()-r.height,o=Math.abs(n[0]._gsTransform.x/i*100),u=Math.abs(n[0]._gsTransform.y/s*100);if(s==0)u=0;if(i==0)o=0;t.data("bgposition",o+"% "+u+"%");if(!a(8))t.data("currotate",Y(n));if(!a(8))t.data("curscale",T.w*e+"%  "+(T.h*e+"%"))}}))})};var G=function(e,t,n,r,i){var s=new Object;if(!i)s.w=parseInt(n.split(" ")[0],0)/100;else s.w=parseInt(n.split(" ")[1],0)/100;switch(t){case"left top":case"top left":s.x=0;s.y=0;break;case"center top":case"top center":s.x=((0-r.width())*s.w+parseInt(e.width,0))/2;s.y=0;break;case"top right":case"right top":s.x=(0-r.width())*s.w+parseInt(e.width,0);s.y=0;break;case"center left":case"left center":s.x=0;s.y=((0-r.height())*s.w+parseInt(e.height,0))/2;break;case"center center":s.x=((0-r.width())*s.w+parseInt(e.width,0))/2;s.y=((0-r.height())*s.w+parseInt(e.height,0))/2;break;case"center right":case"right center":s.x=(0-r.width())*s.w+parseInt(e.width,0);s.y=((0-r.height())*s.w+parseInt(e.height,0))/2;break;case"bottom left":case"left bottom":s.x=0;s.y=(0-r.height())*s.w+parseInt(e.height,0);break;case"bottom center":case"center bottom":s.x=((0-r.width())*s.w+parseInt(e.width,0))/2;s.y=(0-r.height())*s.w+parseInt(e.height,0);break;case"bottom right":case"right bottom":s.x=(0-r.width())*s.w+parseInt(e.width,0);s.y=(0-r.height())*s.w+parseInt(e.height,0);break}return s};var Y=function(e){var t=e.css("-webkit-transform")||e.css("-moz-transform")||e.css("-ms-transform")||e.css("-o-transform")||e.css("transform");if(t!=="none"){var n=t.split("(")[1].split(")")[0].split(",");var r=n[0];var i=n[1];var s=Math.round(Math.atan2(i,r)*(180/Math.PI))}else{var s=0}return s<0?s+=360:s};var Z=function(n,r){try{var i=n.find(">ul:first-child >li:eq("+r.act+")")}catch(s){var i=n.find(">ul:first-child >li:eq(1)")}r.lastslide=r.act;var o=n.find(">ul:first-child >li:eq("+r.next+")");var u=i.find(".slotholder");var a=o.find(".slotholder");n.find(".defaultimg").each(function(){var n=e(this);punchgs.TweenLite.killTweensOf(n,false);punchgs.TweenLite.set(n,{scale:1,rotationZ:0});punchgs.TweenLite.killTweensOf(n.data("kenburn img"),false);if(n.data("kenburn")!=t){n.data("kenburn").pause()}if(n.data("currotate")!=t&&n.data("bgposition")!=t&&n.data("curscale")!=t)punchgs.TweenLite.set(n,{rotation:n.data("currotate"),backgroundPosition:n.data("bgposition"),backgroundSize:n.data("curscale")});if(n!=t&&n.data("kenburn img")!=t&&n.data("kenburn img").length>0)punchgs.TweenLite.set(n.data("kenburn img"),{autoAlpha:0})})};var et=function(t,n){if(J()&&n.parallaxDisableOnMobile=="on")return false;t.find(">ul:first-child >li").each(function(){var t=e(this);for(var r=1;r<=10;r++)t.find(".rs-parallaxlevel-"+r).each(function(){var t=e(this);t.wrap('<div style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:'+t.css("zIndex")+'" class="tp-parallax-container" data-parallaxlevel="'+n.parallaxLevels[r-1]+'"></div>')})});if(n.parallax=="mouse"||n.parallax=="scroll+mouse"||n.parallax=="mouse+scroll"){t.mouseenter(function(e){var n=t.find(".current-sr-slide-visible");var r=t.offset().top,i=t.offset().left,s=e.pageX-i,o=e.pageY-r;n.data("enterx",s);n.data("entery",o)});t.on("mousemove.hoverdir, mouseleave.hoverdir",function(r){var i=t.find(".current-sr-slide-visible");switch(r.type){case"mousemove":var s=t.offset().top,o=t.offset().left,u=i.data("enterx"),a=i.data("entery"),f=u-(r.pageX-o),l=a-(r.pageY-s);i.find(".tp-parallax-container").each(function(){var t=e(this),r=parseInt(t.data("parallaxlevel"),0)/100,i=f*r,s=l*r;if(n.parallax=="scroll+mouse"||n.parallax=="mouse+scroll")punchgs.TweenLite.to(t,.4,{force3D:"auto",x:i,ease:punchgs.Power3.easeOut,overwrite:"all"});else punchgs.TweenLite.to(t,.4,{force3D:"auto",x:i,y:s,ease:punchgs.Power3.easeOut,overwrite:"all"})});break;case"mouseleave":i.find(".tp-parallax-container").each(function(){var t=e(this);if(n.parallax=="scroll+mouse"||n.parallax=="mouse+scroll")punchgs.TweenLite.to(t,1.5,{force3D:"auto",x:0,ease:punchgs.Power3.easeOut});else punchgs.TweenLite.to(t,1.5,{force3D:"auto",x:0,y:0,ease:punchgs.Power3.easeOut})});break}});if(J())window.ondeviceorientation=function(n){var r=Math.round(n.beta||0),i=Math.round(n.gamma||0);var s=t.find(".current-sr-slide-visible");if(e(window).width()>e(window).height()){var o=i;i=r;r=o}var u=360/t.width()*i,a=180/t.height()*r;s.find(".tp-parallax-container").each(function(){var t=e(this),n=parseInt(t.data("parallaxlevel"),0)/100,r=u*n,i=a*n;punchgs.TweenLite.to(t,.2,{force3D:"auto",x:r,y:i,ease:punchgs.Power3.easeOut})})}}if(n.parallax=="scroll"||n.parallax=="scroll+mouse"||n.parallax=="mouse+scroll"){e(window).on("scroll",function(e){tt(t,n)})}};var tt=function(t,n){if(J()&&n.parallaxDisableOnMobile=="on")return false;var r=t.offset().top,i=e(window).scrollTop(),s=r+t.height()/2,o=r+t.height()/2-i,u=e(window).height()/2,a=u-o;if(s<u)a=a-(u-s);var f=t.find(".current-sr-slide-visible");t.find(".tp-parallax-container").each(function(t){var n=e(this),r=parseInt(n.data("parallaxlevel"),0)/100,i=a*r;n.data("parallaxoffset",i);punchgs.TweenLite.to(n,.2,{force3D:"auto",y:i,ease:punchgs.Power3.easeOut})});if(n.parallaxBgFreeze!="on"){var l=n.parallaxLevels[0]/100,c=a*l;punchgs.TweenLite.to(t,.2,{force3D:"auto",y:c,ease:punchgs.Power3.easeOut})}};var nt=function(n,r){var i=n.parent();if(r.navigationType=="thumb"||r.navsecond=="both"){i.append('<div class="tp-bullets tp-thumbs '+r.navigationStyle+'"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>')}var s=i.find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");var o=s.parent();o.width(r.thumbWidth*r.thumbAmount);o.height(r.thumbHeight);o.parent().width(r.thumbWidth*r.thumbAmount);o.parent().height(r.thumbHeight);n.find(">ul:first >li").each(function(e){var i=n.find(">ul:first >li:eq("+e+")");var o=i.find(".defaultimg").css("backgroundColor");if(i.data("thumb")!=t)var u=i.data("thumb");else var u=i.find("img:first").attr("src");s.append('<div class="bullet thumb" style="background-color:'+o+";position:relative;width:"+r.thumbWidth+"px;height:"+r.thumbHeight+"px;background-image:url("+u+') !important;background-size:cover;background-position:center center;"></div>');var a=s.find(".bullet:first")});var u=10;s.find(".bullet").each(function(t){var i=e(this);if(t==r.slideamount-1)i.addClass("last");if(t==0)i.addClass("first");i.width(r.thumbWidth);i.height(r.thumbHeight);if(u<i.outerWidth(true))u=i.outerWidth(true);i.click(function(){if(r.transition==0&&i.index()!=r.act){r.next=i.index();f(r,n)}})});var a=u*n.find(">ul:first >li").length;var l=s.parent().width();r.thumbWidth=u;if(l<a){e(document).mousemove(function(t){e("body").data("mousex",t.pageX)});s.parent().mouseenter(function(){var t=e(this);var r=t.offset(),i=e("body").data("mousex")-r.left,s=t.width(),o=t.find(".bullet:first").outerWidth(true),u=o*n.find(">ul:first >li").length,a=u-s+15,f=a/s;t.addClass("over");i=i-30;var l=0-i*f;if(l>0)l=0;if(l<0-u+s)l=0-u+s;it(t,l,200)});s.parent().mousemove(function(){var t=e(this),r=t.offset(),i=e("body").data("mousex")-r.left,s=t.width(),o=t.find(".bullet:first").outerWidth(true),u=o*n.find(">ul:first >li").length-1,a=u-s+15,f=a/s;i=i-3;if(i<6)i=0;if(i+3>s-6)i=s;var l=0-i*f;if(l>0)l=0;if(l<0-u+s)l=0-u+s;it(t,l,0)});s.parent().mouseleave(function(){var t=e(this);t.removeClass("over");rt(n)})}};var rt=function(e){var t=e.parent().find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer"),n=t.parent(),r=n.offset(),i=n.find(".bullet:first").outerWidth(true),s=n.find(".bullet.selected").index()*i,o=n.width(),i=n.find(".bullet:first").outerWidth(true),u=i*e.find(">ul:first >li").length,a=u-o,f=a/o,l=0-s;if(l>0)l=0;if(l<0-u+o)l=0-u+o;if(!n.hasClass("over")){it(n,l,200)}};var it=function(e,t,n){punchgs.TweenLite.to(e.find(".tp-thumbcontainer"),.2,{force3D:"auto",left:t,ease:punchgs.Power3.easeOut,overwrite:"auto"})}})(jQuery)


