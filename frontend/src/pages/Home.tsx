import '../styles/common.css'
import '../styles/home.css'

interface HomeProps {
  today: string
  baseball: boolean
  gameTime?: string
  away?: { img: string; name: string }
  home?: { img: string; name: string; latitude: number; longitude: number; place: string }
  entry?: { name: string; avgERA: string; opsWHIP: string }[]
  weather?: {
    weather: { icon: string }[]
    main: { temp: number; humidity: number }
    clouds: { all: number }
    wind: { speed: number }
  }
  top5Favorites?: {
    id: number
    favoriteImgs: { fileName: string }[]
  }[]
  news?: { items: { originallink: string; title: string }[] }
}

export default function Home({
  today,
  baseball,
  gameTime,
  away,
  home,
  entry,
  weather,
  top5Favorites,
  news
}: HomeProps) {
  return (
    <div id="main-wrapper">
      <div id="main-today" className="display-flex-set">
        {/* 날짜 */}
        <div id="main-today-date-time" className="display-flex">
          <div>{today}</div>
          {baseball && <div id="today-time">{gameTime}</div>}
        </div>

        {!baseball && <div id="not-today" className="display-flex-set">오늘은 경기가 없습니다</div>}

        {baseball && home && away && (
          <>
            {/* 상대 */}
            <ul id="main-today-opponent" className="display-flex-set">
              <li id="away">
                <img src={`/img/${away.img}`} />
                <span>{away.name}</span>
              </li>
              <img src="/img/baseball.png" />
              <li id="home">
                <span>{home.name}</span>
                <img src={`/img/${home.img}`} />
              </li>
            </ul>

            <div id="main-today-inform" className="display-flex-set">
              {/* 엔트리 */}
              <ul id="main-today-entry" className="display-flex">
                <li className="display-flex-set">
                  <div className="entry-index">타순</div>
                  <div className="entry-player">선수명</div>
                  <div className="entry-player">AVG/ERA</div>
                  <div className="entry-player">OPS/WHIP</div>
                </li>
                {entry?.map((e, index) => (
                  <li key={index} className="display-flex-set">
                    <div className="entry-index">{index + 1}</div>
                    <div className="entry-player">{e.name}</div>
                    <div className="entry-player">{e.avgERA}</div>
                    <div className="entry-player">{e.opsWHIP}</div>
                  </li>
                ))}
              </ul>

              {/* 지도 */}
              {home && (
                <div className="place-content display-flex-set" id="place-map">
                  <div className="map-wrap">
                    <div id="latitude">{home.latitude}</div>
                    <div id="longitude">{home.longitude}</div>
                  </div>
                </div>
              )}

              {/* 날씨 */}
              {weather && home && (
                <div className="place-content display-flex" id="place-weather">
                  <div id="weather-title">
                    <img src="/img/home-location.png" />
                    <span id="location">{home.place}</span>
                  </div>
                  <div id="weather-second" className="display-flex-set">
                    <div className="display-flex-set">
                      <div id="weather-icon">{weather.weather[0].icon}</div>
                      <div>
                        <span id="temperature">{weather.main.temp}°C</span>
                      </div>
                    </div>
                    <div className="display-flex-set">
                      <img src="/img/home-humidity.png" />
                      <span id="humidity">{weather.main.humidity}%</span>
                    </div>
                    <div className="display-flex-set">
                      <img src="/img/home-cloud.png" />
                      <span id="cloud">{weather.clouds.all}%</span>
                    </div>
                    <div className="display-flex-set">
                      <img src="/img/home-wind.png" />
                      <span id="wind">{weather.wind.speed}m/s</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div id="main-fan" className="display-flex-set">
        <div id="main-fan-content">
          <ul id="slide-wrap" className="display-flex">
            {top5Favorites?.map(favorite => (
              <li key={favorite.id}>
                <a href={`/community/favorite/detail/${favorite.id}`}>
                  <img src={`/upload/${favorite.favoriteImgs[0].fileName}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul id="slide-btn-wrap" className="display-flex">
          <li className="active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div id="main-news" className="display-flex-set">
        <div id="main-news-title">NEWS</div>
        <div id="main-news-content" className="display-flex-set">
          {news?.items.map((n, index) => (
            <a key={index} className="news-item" href={n.originallink} target="_blank" rel="noreferrer">
              {n.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
