// size of the outer div for skull icons
export const eSize = 35;
export const homebaseSize = 70;

export const newChestStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: -eSize / 2,
  top: -eSize / 2,
  borderRadius: eSize,
  content: 'url(http://orig06.deviantart.net/712c/f/2010/236/2/e/spinning_coin___animation_by_mantastic001.gif)',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
};

export const visitedChestStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: -eSize / 2,
  top: -eSize / 2,
  borderRadius: eSize,
  content: 'url(../resources/grayChest.png)',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
};

export const homebaseStyle = coins => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: -homebaseSize / 2,
  top: -homebaseSize / 2,
  borderRadius: homebaseSize,
  content: 'url(../resources/coinBag/money-bag-' + coins + '.png)',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
});

export const outerDivStyle = {
  position: 'absolute',
  width: eSize,
  height: eSize,
};

export const outerHomebaseDivStyle = {
  position: 'absolute',
  width: homebaseSize,
  height: homebaseSize,
};

export const userSpotStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: -eSize / 2,
  top: -eSize / 2,
  borderRadius: eSize,
  content: 'url(https://2.bp.blogspot.com/-fQuA-G2XLw8/VX4TFzAtVeI/AAAAAAAAB-w/-MWtUdnzOAw/s1600/BlueDot64.png)',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
};
