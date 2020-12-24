let nodeEnv = 'development';
let debug = 'true';
export default {
  NODE_ENV: nodeEnv,
  DEBUG: debug,
};

/**
 * 현재는 env 파일 변경 후에 이쪽 파일을 한번 더 변경해서 refresh 시켜줘야지만 변경한 env내용이 적용된다.
 * 그런고로 방법은 아래와 같다.
 * 관련 깃허브 이슈페이지: https://github.com/zetachang/react-native-dotenv/issues/20
 * 1. .env파일 변경
 * 2. 이쪽파일 변경
 * 3. 앱 리로드
 * 변경용 쓸데없는소리. 오늘은 피자를 시켜먹었는데 피자스쿨에 고르곤졸라 + 버팔로스틱(감자튀김)을 시켰는데
 * 버팔로 피자로 알아들으셔서 피자 두판을 주셨다. 그냥먹었다.
 * 다시이번엔 데브로 가기 위해 변경
 */
