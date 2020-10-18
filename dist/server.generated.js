module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/controllers/article.controllers.js":
/*!***************************************************!*\
  !*** ./server/controllers/article.controllers.js ***!
  \***************************************************/
/*! exports provided: list, create, remove, read, articleById, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"list\", function() { return list; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"read\", function() { return read; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"articleById\", function() { return articleById; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony import */ var _models_Article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../models/Article */ \"./server/models/Article.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../models/User */ \"./server/models/User.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst create = async (req, res) => {\n  const article = new _models_Article__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    title: req.body.title,\n    image: req.body.image,\n    markdown: req.body.markdown,\n    postedBy: req.auth._id\n  });\n\n  try {\n    await article.save();\n    await _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findByIdAndUpdate(req.auth._id, {\n      $push: {\n        articles: article._id\n      }\n    }, {\n      new: true\n    });\n    return res.status(200).json({\n      message: \"article Created\",\n      article\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    const articles = await _models_Article__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().populate('postedBy', 'name');\n    return res.status(200).json(articles);\n  } catch (err) {\n    console.log(err);\n    res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst articleById = async (req, res, next, id) => {\n  try {\n    const article = await _models_Article__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id).populate('postedBy', 'name').select('-__v');\n    if (!article) return res.status(404).json({\n      error: \"Article not found\"\n    });\n    req.article = article;\n    next();\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: \"somthing went wrong!\"\n    });\n  }\n};\n\nconst read = async (req, res) => {\n  const article = req.article;\n  return res.status(200).json(article);\n};\n\nconst update = async (req, res) => {\n  let article = req.article;\n  article = Object(lodash__WEBPACK_IMPORTED_MODULE_3__[\"extend\"])(article, req.body);\n\n  try {\n    await article.save();\n    return res.status(200).json({\n      article,\n      message: \"article updated!\"\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  const article = req.article;\n\n  try {\n    await article.remove();\n    return res.status(200).json({\n      message: \"Article Deleted!\"\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n\n\n//# sourceURL=webpack:///./server/controllers/article.controllers.js?");

/***/ }),

/***/ "./server/controllers/auth.controllers.js":
/*!************************************************!*\
  !*** ./server/controllers/auth.controllers.js ***!
  \************************************************/
/*! exports provided: signin, signout, hasAuth, requireSignin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signin\", function() { return signin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signout\", function() { return signout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasAuth\", function() { return hasAuth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requireSignin\", function() { return requireSignin; });\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../models/User */ \"./server/models/User.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst signin = async (req, res) => {\n  try {\n    const {\n      name,\n      password\n    } = req.body;\n    const user = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      name\n    });\n    if (!user) return res.json({\n      message: \"user doesnt exist\"\n    });\n    if (!password || !name) return res.status(400).json({\n      message: 'please fill all the fields'\n    });\n\n    if (!user.authenticate(password)) {\n      return res.status(400).json({\n        message: 'wrong password'\n      });\n    }\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.sign({\n      _id: user._id\n    }, process.env.JWT_SECRET);\n    res.cookie('t', token);\n    return res.json({\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email,\n        articles: user.articles,\n        recipes: user.recipes\n      }\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(401).json({\n      message: \"couldnt sign in\"\n    });\n  }\n};\n\nconst signout = (req, res) => {\n  res.clearCookie('t');\n  return res.status(200).json({\n    message: \"signed out\"\n  });\n};\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  secret: 'kos',\n  userProperty: 'auth',\n  algorithms: ['HS256']\n});\n\nconst hasAuth = async (req, res, next) => {\n  const user = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.auth._id);\n  const autherized = user.isAdmin && req.auth;\n  if (!autherized) return res.status(401).json({\n    error: \"user not autherized\"\n  });\n  next();\n};\n\n\n\n//# sourceURL=webpack:///./server/controllers/auth.controllers.js?");

/***/ }),

/***/ "./server/controllers/recipe.controllers.js":
/*!**************************************************!*\
  !*** ./server/controllers/recipe.controllers.js ***!
  \**************************************************/
/*! exports provided: remove, update, recipeById, read, list, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"recipeById\", function() { return recipeById; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"read\", function() { return read; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"list\", function() { return list; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony import */ var _models_Recipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../models/Recipe */ \"./server/models/Recipe.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../models/User */ \"./server/models/User.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst create = async (req, res) => {\n  const recipe = new _models_Recipe__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    title: req.body.title,\n    ingredients: req.body.ingredients,\n    description: req.body.description,\n    instruction: req.body.instruction,\n    postedBy: req.auth._id\n  });\n\n  try {\n    await recipe.save();\n    await _models_User__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findByIdAndUpdate(req.auth._id, {\n      $push: {\n        recipes: recipe._id\n      }\n    }, {\n      new: true\n    });\n    return res.status(201).json({\n      recipe,\n      message: \"recipe created\"\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    const recipes = await _models_Recipe__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().populate('postedBy', 'name');\n    return res.status(200).json(recipes);\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst recipeById = async (req, res, next, id) => {\n  try {\n    const recipe = await _models_Recipe__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id).populate('postedBy', 'name').select('-__v');\n    if (!recipe) return res.status(404).json({\n      error: 'recipe not found!'\n    });\n    req.recipe = recipe;\n    next();\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst read = async (req, res) => {\n  return res.status(200).json(req.recipe);\n};\n\nconst update = async (req, res) => {\n  let recipe = req.recipe;\n  recipe = Object(lodash__WEBPACK_IMPORTED_MODULE_3__[\"extend\"])(recipe, req.body);\n\n  try {\n    await recipe.save();\n    return res.status(201).json({\n      recipe,\n      message: \"recipe updated!\"\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  const recipe = req.recipe;\n\n  try {\n    await recipe.remove();\n    return res.status(200).json({\n      message: 'recipe deleted!'\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n\n\n//# sourceURL=webpack:///./server/controllers/recipe.controllers.js?");

/***/ }),

/***/ "./server/controllers/user.controllers.js":
/*!************************************************!*\
  !*** ./server/controllers/user.controllers.js ***!
  \************************************************/
/*! exports provided: remove, create, list, read, update, userById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"list\", function() { return list; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"read\", function() { return read; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userById\", function() { return userById; });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../models/User */ \"./server/models/User.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n\n\n\n\nconst create = async (req, res) => {\n  const user = new _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"](req.body);\n\n  try {\n    await user.save();\n    return res.status(201).json({\n      message: \"user created btich!\"\n    });\n  } catch (err) {\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    const users = await _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find().populate('articles', 'title').populate('recipes', 'title');\n    return res.status(200).json(users);\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst userById = async (req, res, next, id) => {\n  const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findById(id).populate('articles', 'title').populate('recipes', 'title');\n\n  if (!user) {\n    return res.status(404).json({\n      message: \"user not found !\"\n    });\n  }\n\n  req.profile = user;\n  return next();\n};\n\nconst read = async (req, res) => {\n  const user = req.profile;\n  return res.status(200).json(user);\n};\n\nconst update = async (req, res) => {\n  try {\n    let user = req.profile;\n    user = Object(lodash__WEBPACK_IMPORTED_MODULE_0__[\"extend\"])(user, req.body);\n    await user.save();\n    return res.status(201).json({\n      user,\n      message: \"user updated\"\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    const user = req.profile;\n    await user.remove();\n    return res.status(200).json({\n      message: \"user deleted!\"\n    });\n  } catch (err) {\n    console.log(err);\n    return res.status(500).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n\n\n//# sourceURL=webpack:///./server/controllers/user.controllers.js?");

/***/ }),

/***/ "./server/devBundle.js":
/*!*****************************!*\
  !*** ./server/devBundle.js ***!
  \*****************************/
/*! exports provided: compile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compile\", function() { return compile; });\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _webpack_dev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../webpack.dev */ \"./webpack.dev.js\");\n/* harmony import */ var _webpack_dev__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst compiler = webpack__WEBPACK_IMPORTED_MODULE_0___default()(_webpack_dev__WEBPACK_IMPORTED_MODULE_1___default.a);\nconst compile = app => {\n  app.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler, {\n    noInfo: true,\n    publicPath: _webpack_dev__WEBPACK_IMPORTED_MODULE_1___default.a.output.publicPath\n  }));\n  app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler));\n};\n\n//# sourceURL=webpack:///./server/devBundle.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../template */ \"./template.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_template__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _devBundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./devBundle */ \"./server/devBundle.js\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* harmony import */ var _routes_article_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/article.routes */ \"./server/routes/article.routes.js\");\n/* harmony import */ var _routes_recipe_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/recipe.routes */ \"./server/routes/recipe.routes.js\");\nif (true) {\n  __webpack_require__(/*! dotenv */ \"dotenv\").config();\n}\n\n\n\n\n\n\n\n\n\n\n\n\nconst CURRENT_WORKING_DIRECTORY = process.cwd();\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nObject(_devBundle__WEBPACK_IMPORTED_MODULE_2__[\"compile\"])(app);\napp.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_4___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n  extended: true\n}));\napp.use(helmet__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use('/dist', express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_6___default.a.join(CURRENT_WORKING_DIRECTORY, 'dist')));\napp.use('/', _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\napp.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\napp.use('/', _routes_article_routes__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\napp.use('/', _routes_recipe_routes__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\napp.get('/', (req, res) => {\n  res.status(200).send(_template__WEBPACK_IMPORTED_MODULE_1___default()());\n});\napp.use((err, req, res, next) => {\n  if (err.name === 'UnautherizedError') {\n    res.status(401).json({\n      error: err.name + \": \" + err.message\n    });\n  } else if (err) {\n    res.status(400).json({\n      error: err.name + \": \" + err.message\n    });\n  }\n\n  console.log(err);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./server/express.js?");

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*\
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst getErrorMessage = err => {\n  let message = '';\n\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n\n      default:\n        message = 'Something went wrong!';\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) message = err.errors[errName].message;\n    }\n  }\n\n  return message;\n};\n\nconst getUniqueErrorMessage = err => {\n  let output;\n\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf('index:') + 7, err.message.lastIndexOf('_1'));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists!';\n  } catch (ex) {\n    output = 'Unique field already exists';\n  }\n\n  return output;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  getErrorMessage\n});\n\n//# sourceURL=webpack:///./server/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./server/models/Article.js":
/*!**********************************!*\
  !*** ./server/models/Article.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ArticleSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  title: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  image: {\n    data: Buffer,\n    contentType: String\n  },\n  markdown: {\n    type: String,\n    required: true\n  },\n  postedBy: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema.Types.ObjectId,\n    ref: 'User'\n  }\n}, {\n  timestamps: true\n});\nconst Article = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Article', ArticleSchema);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Article);\n\n//# sourceURL=webpack:///./server/models/Article.js?");

/***/ }),

/***/ "./server/models/Recipe.js":
/*!*********************************!*\
  !*** ./server/models/Recipe.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst RecipeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  title: {\n    type: String,\n    required: true\n  },\n  ingredients: {\n    type: [],\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  instruction: {\n    type: String,\n    required: true\n  },\n  postedBy: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema.Types.ObjectId,\n    ref: 'User'\n  }\n}, {\n  timestamps: true\n});\nconst Recipe = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Recipe', RecipeSchema);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Recipe);\n\n//# sourceURL=webpack:///./server/models/Recipe.js?");

/***/ }),

/***/ "./server/models/User.js":
/*!*******************************!*\
  !*** ./server/models/User.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  name: {\n    type: String,\n    trim: true,\n    required: 'User name is required'\n  },\n  email: {\n    type: String,\n    trim: true,\n    required: 'Emial is required',\n    unique: 'Email already exists!',\n    match: [/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/, 'please enter a valid email address.']\n  },\n  hashed_password: {\n    type: String,\n    required: 'password is required!'\n  },\n  salt: String,\n  isAdmin: {\n    type: Boolean,\n    default: false\n  },\n  articles: [{\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0__[\"Schema\"].Types.ObjectId,\n    ref: 'Article'\n  }],\n  recipes: [{\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0__[\"Schema\"].Types.ObjectId,\n    ref: 'Recipe'\n  }]\n}, {\n  timestamps: true\n});\nUserSchema.methods = {\n  encryptPassword: function (password) {\n    if (!password) return null;\n    return crypto__WEBPACK_IMPORTED_MODULE_1___default.a.createHmac('sha256', this.salt).update(password).digest('hex');\n  },\n  makeSalt: function () {\n    return crypto__WEBPACK_IMPORTED_MODULE_1___default.a.randomBytes(20).toString('hex');\n  },\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  }\n};\nUserSchema.virtual('password').set(function (password) {\n  this._password = password, this.salt = this.makeSalt(), this.name === 'Parya' ? this.isAdmin = true : false, this.hashed_password = this.encryptPassword(password);\n}).get(() => {\n  return undefined._password;\n});\nUserSchema.path('hashed_password').validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate('password', 'Password must be at least 6 characters');\n  }\n\n  if (this.name && this.name.length < 3) {\n    this.invalidate('name', 'name must be at least 3 characters');\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate('password', 'Passwotd is Required!');\n  }\n}, null);\nconst User = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('User', UserSchema);\n/* harmony default export */ __webpack_exports__[\"default\"] = (User);\n\n//# sourceURL=webpack:///./server/models/User.js?");

/***/ }),

/***/ "./server/routes/article.routes.js":
/*!*****************************************!*\
  !*** ./server/routes/article.routes.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../controllers/auth.controllers */ \"./server/controllers/auth.controllers.js\");\n/* harmony import */ var _controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../controllers/article.controllers */ \"./server/controllers/article.controllers.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.route('/api/articles').get(_controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__[\"list\"]).post(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__[\"create\"]);\nrouter.route('/api/articles/:articleId').get(_controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__[\"read\"]).put(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__[\"update\"]).delete(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__[\"remove\"]);\nrouter.param('articleId', _controllers_article_controllers__WEBPACK_IMPORTED_MODULE_2__[\"articleById\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./server/routes/article.routes.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controllers */ \"./server/controllers/auth.controllers.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.route('/auth/signin').post(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"signin\"]);\nrouter.route('/auth/signout').get(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"signout\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/recipe.routes.js":
/*!****************************************!*\
  !*** ./server/routes/recipe.routes.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/recipe.controllers */ \"./server/controllers/recipe.controllers.js\");\n/* harmony import */ var _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../controllers/auth.controllers */ \"./server/controllers/auth.controllers.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.route('/api/recipes').get(_controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__[\"list\"]).post(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__[\"hasAuth\"], _controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__[\"create\"]);\nrouter.route('/api/recipes/:recipeId').get(_controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__[\"read\"]).put(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__[\"hasAuth\"], _controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__[\"update\"]).delete(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_2__[\"hasAuth\"], _controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__[\"remove\"]);\nrouter.param('recipeId', _controllers_recipe_controllers__WEBPACK_IMPORTED_MODULE_1__[\"recipeById\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./server/routes/recipe.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../controllers/user.controllers */ \"./server/controllers/user.controllers.js\");\n/* harmony import */ var _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../controllers/auth.controllers */ \"./server/controllers/auth.controllers.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_2___default.a.Router();\nrouter.route('/api/users').post(_controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__[\"create\"]).get(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__[\"list\"]);\nrouter.route('/api/users/:userId').get(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__[\"read\"]).put(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__[\"update\"]).delete(_controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"requireSignin\"], _controllers_auth_controllers__WEBPACK_IMPORTED_MODULE_1__[\"hasAuth\"], _controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__[\"remove\"]);\nrouter.param('userId', _controllers_user_controllers__WEBPACK_IMPORTED_MODULE_0__[\"userById\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n\n\nmongoose__WEBPACK_IMPORTED_MODULE_1___default.a.connect(process.env.MONGO_URI, {\n  useNewUrlParser: true,\n  useCreateIndex: true,\n  useUnifiedTopology: true\n});\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.connection;\ndb.on('error', console.error.bind(console, 'connection error:'));\ndb.once('open', function () {\n  console.log('connected to mongoose...');\n});\n_express__WEBPACK_IMPORTED_MODULE_0__[\"default\"].listen(process.env.PORT, err => {\n  if (err) {\n    console.error(err);\n  }\n\n  console.info(`Server started on port ${process.env.PORT}`);\n});\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\n  return `\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <link href=\"https://fonts.googleapis.com/css2?family=Bangers&family=Roboto:ital@1&display=swap\" rel=\"stylesheet\">\n        <title>Document</title>\n    </head>\n    <body>\n        <div id=\"root\"></div>\n        <script type=\"text/javascript\" src=\"/dist/bundle.js\"></script>\n    </body>\n    </html>\n    `;\n};\n\n//# sourceURL=webpack:///./template.js?");

/***/ }),

/***/ "./webpack.dev.js":
/*!************************!*\
  !*** ./webpack.dev.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\n\nconst CURRENT_WORKING_DIRECTORY = process.cwd();\n\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nmodule.exports = {\n  name: 'browser',\n  devtool: 'cheap-module-source-map',\n  mode: 'development',\n  entry: ['webpack-hot-middleware/client?reload=true', path.resolve(CURRENT_WORKING_DIRECTORY, 'client/index.js')],\n  output: {\n    path: path.resolve(CURRENT_WORKING_DIRECTORY, 'dist'),\n    filename: 'bundle.js',\n    publicPath: '/dist/'\n  },\n  module: {\n    rules: [{\n      test: /\\.jsx?$/,\n      use: ['babel-loader']\n    }]\n  },\n  plugins: [new webpack.HotModuleReplacementPlugin()]\n};\n\n//# sourceURL=webpack:///./webpack.dev.js?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./server/server.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\F a r D e a n\\Desktop\\practice\\60socialmedia\\server\\server.js */\"./server/server.js\");\n\n\n//# sourceURL=webpack:///multi_./server/server.js?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-jwt\");\n\n//# sourceURL=webpack:///external_%22express-jwt%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ })

/******/ });