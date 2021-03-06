import path from 'path';

let config = {
  viewDir: path.join(__dirname, '../../web', 'views'),
  staticDir: path.join(__dirname, '../../web', 'assets')
}

if(false) {
  console.log(123)
}

if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    port: 3000,
    cache: false,
  }

  config = {...config, ...devConfig};

}

if (process.env.NODE_ENV === 'production') {
  const proConfig = {
    port: 81,  // 80端口被占用了，本来生产环境http默认是80的
    cache: 'memory',
  }

  config = {...config, ...proConfig};

}

export default config;