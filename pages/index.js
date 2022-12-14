/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import MovieService from '../service/movie';
import TvService from '../service/tv';
import ConfigurationService from '../service/configuration';
import { containerCss } from '../config/styles/commonStyle';
import { useState, Fragment } from 'react';
import { PosterCard } from '../components/common/PosterCard';
import { imageURLBuilder } from '../lib/imageURLBuilder';
import { dateFormatter } from '../lib/dateFormatter';
import { mq } from '../lib/facepaint';
import { SectionHeader } from '../components/common/SectionHeader';
import classnames from 'classnames';
import PageLayout from '../components/common/PageLayout';

function Home(props) {
  return (
    <PageLayout>
      <div css={homeCss}>
        <section className="hero-container">
          <div className="hero-box">
            
            <h2 className="title">Welcome to HOEECHOEE.</h2>
            <h3 className="subtitle">Explore now.</h3>
          </div>
        </section>
        <div id="mainPage" >
        <PosterSection
          config={props.config}
          tabs={POPULAR_SECTION_TABS}
          firstTabData={props.popularTv}
          secondTabData={props.popularMovie}
          sectionTitle="Popular"
        />
        <PosterSection
          config={props.config}
          tabs={TRENDING_SECTION_TABS}
          firstTabData={props.todaysTreding}
          secondTabData={props.weeksTrending}
          sectionTitle="Trending"
          // showBackgroundImage
        />
        <PosterSection
          config={props.config}
          tabs={TOP_RATED_SECTION_TABS}
          firstTabData={props.topRatedTv}
          secondTabData={props.topRatedMovie}
          sectionTitle="Most Rated"
        />
        </div>
      </div>
    </PageLayout>
  );
}

const homeCss = css`
  min-height: calc(100vh - 130px);

  #mainPage{
    background-color: rgb(113 213 225 / 41%);
  }

  .hero-container {
    ${containerCss};
    background:  url(https://media4.giphy.com/media/QLv9CsJBF9f8THWvS0/giphy.gif?cid=ecf05e4763s0ncxjodre0j5w8p0crxiitf71zneagkwai1pk&rid=giphy.gif&ct=g) no-repeat center center fixed; 
  background-size: cover;
    min-height: 300px;
    height: calc(100vh / 2.5);
    max-height: 360px;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .hero-box {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 0 40px;
    justify-content: center;
    .title {
      font-size: 3rem;
      font-weight: 700;
      color: #fff;
      line-height: 1;
      padding-bottom: 8px;
    }
    .subtitle {
      font-size: 2rem;
      font-weight: 600;
      color: #fff;
      line-height: 1;
    }
  }
`;

function PosterSection({
  tabs,
  sectionTitle,
  showBackgroundImage = false,
  config,
  firstTabData = [],
  secondTabData = [],
}) {
  const [firstTab, secondTab] = tabs;

  const [activeTab, setActiveTab] = useState(firstTab.value);

  const backgroundImageImageClass = classnames({
    'trending-bg-image': showBackgroundImage,
  });

  // TODO: Add transition
  return (
    <section css={popularSectionCss}>
      <div className={backgroundImageImageClass}>
        <SectionHeader
          sectionTitle={sectionTitle}
          setActiveButton={setActiveTab}
          activeButtonName={activeTab}
          buttons={tabs}
        />
        <main>
          <Fragment>
            {activeTab === firstTab.value &&
              firstTabData.map((d) => (
                <PosterCard
                  classNames="card-spacing"
                  key={d.id}
                  imageURL={imageURLBuilder(
                    config.images.secure_base_url,
                    config.images.poster_sizes[3],
                    d.poster_path,
                  )}
                  rating={d.vote_average}
                  title={d.title || d.name}
                  subTitle={dateFormatter(d.release_date || d.first_air_date)}
                  detailsPageRoute={
                    firstTab.mediaType
                      ? `/${firstTab.mediaType}/${d.id}-${d.title || d.name}`
                      : `/${d.media_type}/${d.id}-${d.title || d.name}`
                  }
                />
              ))}
            {activeTab === secondTab.value &&
              secondTabData.map((d) => (
                <PosterCard
                  classNames="card-spacing"
                  key={d.id}
                  imageURL={imageURLBuilder(
                    config.images.secure_base_url,
                    config.images.poster_sizes[3],
                    d.poster_path,
                  )}
                  rating={d.vote_average}
                  title={d.title || d.name}
                  subTitle={dateFormatter(d.release_date || d.first_air_date)}
                  detailsPageRoute={
                    secondTab.mediaType
                      ? `/${secondTab.mediaType}/${d.id}-${d.title || d.name}`
                      : `/${d.media_type}/${d.id}-${d.title || d.name}`
                  }
                />
              ))}
          </Fragment>
        </main>
      </div>
    </section>
  );
}

const popularSectionCss = css`
  margin: 0 0;
  min-height: 400px;
  // background-color: rgb(113 213 225 / 41%);
  padding-top: 10px;
  font: italic 1.2em 'Fira Sans', serif;
  ${containerCss};
  // .trending-bg-image {
  //   background-image: url(/assets/images/trending-bg.svg);
  //   background-position: 50% 200px;
  //   background-repeat: no-repeat;
  // }
  main {
    display: flex;
    margin: 20px 0;
    overflow-x: auto;
    ${mq({
      width: ['95%', '95%', '950px', '1150px', '1350px'],
    })}
  }

  main::-webkit-scrollbar{
    // width:0;
    display:none;
  }

  .card-spacing {
    margin-left: 25px;
    transition: all 0.6s ease;
  }
`;

const POPULAR_SECTION_TABS = [
  {
    title: 'On Tv',
    value: 'tv',
    mediaType: 'tv',
    async getData() {
      const res = await TvService.getPopularTvShows();
      return res.results;
    },
  },
  {
    title: 'In Theaters',
    value: 'movie',
    mediaType: 'movie',
    async getData() {
      const res = await MovieService.getPopularMovies();
      return res.results;
    },
  },
];

const TRENDING_SECTION_TABS = [
  {
    value: 'day',
    title: 'Today',
    async getData() {
      const [trendingMovies, trendingTvShows] = await Promise.all([
        MovieService.getTrendingMovies(this.value),
        TvService.getTrendingTvShows(this.value),
      ]);
      return [...trendingMovies.results, ...trendingTvShows.results];
    },
  },
  {
    value: 'week',
    title: 'This Week',
    async getData() {
      const [trendingMovies, trendingTvShows] = await Promise.all([
        MovieService.getTrendingMovies(this.value),
        TvService.getTrendingTvShows(this.value),
      ]);
      return [...trendingMovies.results, ...trendingTvShows.results];
    },
  },
];

const TOP_RATED_SECTION_TABS = [
  {
    title: 'TV Shows',
    value: 'tv',
    mediaType: 'tv',
    async getData() {
      const res = await TvService.getTopRatedTvShows();
      return res.results;
    },
  },
  {
    title: 'Movies',
    value: 'movie',
    mediaType: 'movie',
    async getData() {
      const res = await MovieService.getTopRatedMovies();
      return res.results;
    },
  },
];

export async function getServerSideProps(context) {
  const [
    config,
    popularTv,
    popularMovie,
    trendingMovieToday,
    trendingTvToday,
    trendingMovieWeek,
    trendingTvWeek,
    topRatedTv,
    topRatedMovie,
  ] = await Promise.all([
    ConfigurationService.getConfiguration(),
    TvService.getPopularTvShows(),
    MovieService.getPopularMovies(),
    MovieService.getTrendingMovies('day'),
    TvService.getTrendingTvShows('day'),
    MovieService.getTrendingMovies('week'),
    TvService.getTrendingTvShows('week'),
    TvService.getTopRatedTvShows(),
    MovieService.getTopRatedMovies(),
  ]);
  return {
    props: {
      config,
      popularTv: popularTv.results,
      popularMovie: popularMovie.results,
      todaysTreding: [...trendingMovieToday.results, ...trendingTvToday.results],
      weeksTrending: [...trendingMovieWeek.results, ...trendingTvWeek.results],
      topRatedTv: topRatedTv.results,
      topRatedMovie: topRatedMovie.results,
    },
  };
}

export default Home;
