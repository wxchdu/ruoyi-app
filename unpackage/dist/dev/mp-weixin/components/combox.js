(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/combox"],{

/***/ 100:
/*!**********************************************************!*\
  !*** D:/wokespace/cloud/ruoyi-app/components/combox.vue ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./combox.vue?vue&type=template&id=2f2d9ca5& */ 101);
/* harmony import */ var _combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combox.vue?vue&type=script&lang=js& */ 103);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs




/* normalize component */

var component = Object(_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/combox.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 101:
/*!*****************************************************************************************!*\
  !*** D:/wokespace/cloud/ruoyi-app/components/combox.vue?vue&type=template&id=2f2d9ca5& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./combox.vue?vue&type=template&id=2f2d9ca5& */ 102);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_template_id_2f2d9ca5___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 102:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/wokespace/cloud/ruoyi-app/components/combox.vue?vue&type=template&id=2f2d9ca5& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 =
    (_vm.itype == "popup" || _vm.action) &&
    _vm.showOptions &&
    _vm.input == "tree"
      ? _vm.__map(_vm.tree, function (item, __i0__) {
          var $orig = _vm.__get_orig(item)
          var g0 = item.requested && !(item.children || []).length
          return {
            $orig: $orig,
            g0: g0,
          }
        })
      : null
  var g1 =
    (_vm.itype == "popup" || _vm.action) && _vm.showOptions
      ? _vm.input != "tree" && !_vm.list.length
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showOptions = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g1: g1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 103:
/*!***********************************************************************************!*\
  !*** D:/wokespace/cloud/ruoyi-app/components/combox.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./combox.vue?vue&type=script&lang=js& */ 104);
/* harmony import */ var _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_JS_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_combox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 104:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/wokespace/cloud/ruoyi-app/components/combox.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _utils = _interopRequireDefault(__webpack_require__(/*! ../lib/utils.js */ 33));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = {
  data: function data() {
    return {
      label: "",
      index: 0,
      showOptions: false,
      entity: {},
      list: [],
      root: [],
      tree: [],
      itype: "default",
      keyword: null
    };
  },
  props: {
    title: {
      type: String
    },
    items: {
      type: [String, Array, Object],
      default: function _default() {}
    },
    etype: {
      type: String,
      default: "default"
    },
    action: {
      type: String
    },
    value: {
      type: [Number, String]
    },
    text: {
      type: String
    },
    input: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  name: "combox",
  title: "下拉列表",
  watch: {
    //监听值变化，再赋值给modelVal
    value: function value(_value) {
      this.onInitValue();
    },
    text: function text(value) {
      this.label = this.text;
    },
    items: function items(_items) {
      this.list = this.convert(_items);
      this.onInitValue();
    },
    etype: function etype(value) {
      this.itype = this.etype;
    }
  },
  created: function created() {
    _utils.default._init(this, {}, true);
    this.label = this.text;
    this.itype = this.etype;
    if (this.items && this.items.length) {
      this.list = this.convert(this.items);
      this.onInitValue();
    }
  },
  methods: {
    onShowPopup: function onShowPopup() {
      var _this = this;
      this.showOptions = true;
      if (this.input == "select") {
        this.getList({}, function (list) {
          _this.list = list;
          _this.onInitValue();
        });
      } else if (!this.list.length) {
        this.getList({
          parent: this.input == 'tree' ? 0 : null
        }, function (list) {
          _this.root = [{
            text: "顶级节点",
            value: 0,
            expand: true,
            requested: true,
            children: list
          }];
          _this.tree = _this.convertTree(_this.root);
        });
      }
    },
    onKeyword: function onKeyword() {
      var _this2 = this;
      this.getList({
        q: this.keyword
      }, function (list) {
        _this2.list = list;
        _this2.onInitValue();
      });
    },
    onNode: function onNode(item) {
      var _this3 = this;
      item.expand = !item.expand;
      if (!item.requested) {
        this.getList({
          parent: item.value || item.id
        }, function (list) {
          item.children = list;
          item.requested = true;
          _this3.tree = _this3.convertTree(_this3.root);
        });
      } else {
        this.tree = this.convertTree(this.root);
      }
    },
    convertTree: function convertTree(list) {
      var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var result = [];
      for (var o in list) {
        var item = list[o];
        item.PARENT = parentId;
        item.LEVEL = level;
        result.push(item);
        if (item.expand) {
          var children = this.convertTree(item.children, item.value, level + 1);
          result.push.apply(result, (0, _toConsumableArray2.default)(children));
        }
      }
      return result;
    },
    getList: function getList(params, callback) {
      var _this4 = this;
      var header = {};
      if (this.action.indexOf("api/") == -1 && uni.getStorageSync("Bearer")) {
        header["Authorization"] = "Bearer " + uni.getStorageSync("Bearer");
      }
      _utils.default.request({
        url: this.action,
        data: params,
        header: header,
        success: function success(protocol) {
          if (protocol.success || protocol.code == 200) {
            if (protocol.data) {
              var list = protocol.data.list || protocol.data;
              if (callback) {
                callback(list);
              }
              _this4.list = list;
              _this4.onInitValue();
            }
          }
        }
      });
    },
    convert: function convert(value) {
      if (value && typeof value == "string") {
        value = JSON.parse(value.replace(/[']/g, "\""));
      }
      var array = [];
      if (Array.isArray(value)) {
        for (var o in value) {
          var item = value[o];
          if ((0, _typeof2.default)(item) == "object") {
            array.push(item);
          } else {
            array.push({
              text: item,
              value: item
            });
          }
        }
      } else if ((0, _typeof2.default)(value) == "object") {
        for (var o in value) {
          array.push({
            value: o,
            text: value[o]
          });
        }
      }
      return array;
    },
    onInitValue: function onInitValue() {
      for (var o in this.list) {
        if ((this.list[o].value || this.list[o].id) == this.value) {
          var item = this.entity = this.list[o];
          this.index = o;
          this.label = item.text || item.title || item.name;
          break;
        }
      }
      if (this.list.length > 6) {
        this.itype = "popup";
      }
    },
    onShowSheet: function onShowSheet() {
      var _this5 = this;
      var itemList = [];
      for (var o in this.list) {
        var item = this.list[o];
        itemList.push(item.text || item.title || item.name);
      }
      uni.showActionSheet({
        itemList: itemList,
        success: function success(res) {
          _this5.index = res.tapIndex;
          _this5.onItem(_this5.list[_this5.index]);
        },
        fail: function fail(res) {
          console.log(res.errMsg);
        }
      }, this);
    },
    bindPickerChange: function bindPickerChange(e) {
      this.index = e.detail.value;
      this.onItem(this.list[e.detail.value]);
    },
    onItem: function onItem(item) {
      this.entity = item;
      if (!item) {
        this.label = null;
        this.$emit("input", null);
        this.$emit("change", null);
      } else {
        this.label = item.text || item.title || item.name;
        try {
          if (typeof item.id != "undefined") {
            this.$emit("input", item.id);
            this.$emit("change", item.id);
          } else if (typeof item.value != "undefined") {
            this.$emit("input", item.value);
            this.$emit("change", item.value);
          }
        } catch (ex) {
          console.error(ex);
        }
      }
      this.showOptions = false;
    },
    onStop: function onStop(e) {
      //e.preventDefault();
      return false;
    }
  }
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/combox.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/combox-create-component',
    {
        'components/combox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(100))
        })
    },
    [['components/combox-create-component']]
]);
