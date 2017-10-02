var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

var mongoose = require('mongoose')
var axios = require('axios')
var responseTime = require('response-time')
var redis = require('redis')
var graphQLHTTP = require('express-graphql')
const {
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql')

//----
var clientRedis = redis.createClient()
clientRedis.on('error', err => {
  console.log(err);
})

//----
app.use(responseTime())

// perlu takbikin object e dulu ga? or dibawah lgs graphql list isine string??
const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: {
    text: {
      type: GraphQLString
    }
  }
})

// object utk movie dan tv
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    title: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    },
    poster_path: {
      type: GraphQLString
    },
    popularity: {
      type: GraphQLFloat
    },
    tag: {
      type: new GraphQLList(TagType)
      // or isa lgs (GraphQLString)
      // yup boleh langsung gini..
    },
    status: {
      type: GraphQLString
    }
  }
})

const TvType = new GraphQLObjectType({
  name: 'Tv',
  fields: {
    title: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    },
    poster_path: {
      type: GraphQLString
    },
    popularity: {
      type: GraphQLFloat
    },
    tag: {
      type: new GraphQLList(TagType)
    },
    status: {
      type: GraphQLString
    }
  }
})

//schema diatas e query, jd kudu ada jg!
// query diatas e model2 kita( movie sama tvseries), jd kudu ada,
const appQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // di     localhost:3000/graphql
    // yg dipake utk query = movies, sama tvs disini
    // trus klo ga ada apa2 di awalnya, maka pasti query,
    // tp sebenarnya bisa query, bisa mutations, dll..
    movies: {
      type: new GraphQLList(MovieType),
      resolve: () => axios.get('http://localhost:3001/movies').then((response) => response.data.data)
      // resolve utk menampung data !!
    },
    tvs: {
      type: new GraphQLList(TvType),
      resolve: () => axios.get('http://localhost:3002/tv').then((response) => response.data.data)
    }
  }
})

// ini jalan kedua.. schema.. disini isine query!
const appSchema = new GraphQLSchema({
  query: appQuery
})

// ini yg pertama kali.. org jlin /graphql di localhost 3000
// disini isine schema
app.use('/graphql', graphQLHTTP({
  schema: appSchema,
  graphiql: true
}))



//===========

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000)
// module.exports = app;
