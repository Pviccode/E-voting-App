import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { useState } from 'react';
import Svg, {Text as SvgText, Rect} from 'react-native-svg'

export default function VotePage() {
  // Handle votes count
  const [votes, setVotes] = useState({
    obiVotes: 0,
    tinubuVotes: 0,
    atikuVotes: 0,
    kwankwasoVotes: 0
  });

  function handleVoteCount(aspirantVotes) {
    if (votes[aspirantVotes] === 100) {
        Alert.alert('Info', 'Vote limit for this aspirant reached');
        return null;
    }

    setVotes((prevVotes) => {
        return {...prevVotes, [aspirantVotes]: prevVotes[aspirantVotes] + 1}
    });
  }

  // Handle election winner
  const [checkWinner, setCheckWinner] = useState(false);

  const [winnerImg, setWinnerImg] = useState(null);

  const [winnerName, setWinnerName] = useState('');

  function handleElectionWinner() {
    const finalVotes = {...votes};
    
    // Avoid zero total votes
    const checkZeroTotalVotes = Object.values(finalVotes).reduce((prev, curr) => prev + curr);

    if (checkZeroTotalVotes === 0) {
      Alert.alert('Info', 'Please cast your vote(s)');
      return null;
    }

    const votesArr = [finalVotes.obiVotes, finalVotes.tinubuVotes, finalVotes.atikuVotes, finalVotes.kwankwasoVotes];
    
    // Check for highest votes tie
    const maxVotes = Math.max(...votesArr);

    let maxVotesOccurrence = 0;

    for (let i = 0; i < votesArr.length; i++) {
        if (votesArr[i] === maxVotes) {
            maxVotesOccurrence += 1;
        }
    }

    if (maxVotesOccurrence > 1) {
        Alert.alert('Info', 'Runoff election will be conducted as there is no clear winner');
        return;
    }

    // Check for winner
    votesArr.sort((a,b) => b - a);

    if (votesArr[0] === finalVotes.obiVotes) {
        setCheckWinner(true);
        setWinnerImg(require('../assets/aspirantImgs/PeterObi.jpg'));
        setWinnerName(() => 'Peter Gregory Obi');

    }else if (votesArr[0] === finalVotes.tinubuVotes) {
        setCheckWinner(true);
        setWinnerImg(require('../assets/aspirantImgs/Tinubu.jpg'));
        setWinnerName(() => 'Bola Ahmed Tinubu');

    }else if (votesArr[0] === finalVotes.atikuVotes) {
        setCheckWinner(true);
        setWinnerImg(require('../assets/aspirantImgs/Atiku.jpg'));
        setWinnerName(() => 'Atiku Abubukar');

    } else if (votesArr[0] === finalVotes.kwankwasoVotes) {
        setCheckWinner(true);
        setWinnerImg(require('../assets/aspirantImgs/Kwankwaso.jpg'));
        setWinnerName(() => 'Rabiu Kwankwaso');
    }
  }

  /* Set dynamic or changing election bar chart according to votes count*/
  const [electionData, setElectionData] = useState([
    {label: 'Obi', value: 0},
    {label: 'Tinubu', value: 0},
    {label: 'Atiku', value: 0},
    {label: 'Kwankwaso', value: 0},
  ])
  
  // Fixed horizontal and vertical labels
  const verticalLabels = ['0', '20', '40', '60', '80', '100'];
  const horizontalLabels = electionData.map((item) => (item.label))

  // Chart width and height dimensions
  const chartWidth = 365;
  const chartHeight = 230;
  const chartPadding = 20;

  // Function to update election data
  function updateElectionData() {
    const finalVotes = Object.values(votes);

    const checkZeroTotalVotes = finalVotes.reduce((prev, curr) => prev + curr);

    if (checkZeroTotalVotes === 0) {
      return;
    }

    const totalVotesCast = finalVotes.reduce((pre,curr) => pre + curr);

    const newElectionData = electionData.map((item, index) => ({
        label: item.label,
        value: finalVotes[index] / totalVotesCast * 100,
    }));

    setElectionData(newElectionData);
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/aspirantImgs/background.jpg')} style={styles.imgBackground} resizeMode="cover">
        <ScrollView style={{flex: 1, backgroundColor: "rgba(255, 255, 255, 0.95)"}}>
          <View style={{flex: 1}}>
            <View style={styles.electionHeader}>
              <Text style={{ fontSize: 23, fontWeight: "bold" }}>PRESIDENTIAL ELECTION RACE</Text>
            </View>

            <View style={styles.aspirantsCon}>
              <Text style={{fontSize: 18, fontWeight: '500', marginLeft: 12, color: "#28231D"}}>Presidential aspirants</Text>

              <View style={styles.aspirantsSection}>

                <View style={styles.aspirant}>
                  <Image source={require('../assets/aspirantImgs/PeterObi.jpg')} style={styles.aspirantImg} />
                  <View style={styles.aspirantDetails}>
                    <View>
                      <Text style={styles.aspirantName}>Peter</Text>
                      <Text style={styles.aspirantName}>Gregory Obi</Text>
                    </View>
                    <Image source={require('../assets/partyLogos/LP.png')} style={styles.logoImg}/>
                  </View>
                  <TouchableOpacity style={styles.voteBtn} onPress={() => {handleVoteCount('obiVotes')}} activeOpacity={0.7}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Votes: {votes.obiVotes > 0 ? votes.obiVotes : 0}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.aspirant}>
                  <Image source={require('../assets/aspirantImgs/Tinubu.jpg')} style={styles.aspirantImg} />
                  <View style={styles.aspirantDetails}>
                    <View>
                      <Text style={styles.aspirantName}>Bola Ahmed</Text>
                      <Text style={styles.aspirantName}>Tinubu</Text>
                    </View>
                    <Image source={require('../assets/partyLogos/APC.png')} style={styles.logoImg}/>
                  </View>
                  <TouchableOpacity style={styles.voteBtn} onPress={() => {handleVoteCount('tinubuVotes')}} activeOpacity={0.7}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Votes: {votes.tinubuVotes > 0 ? votes.tinubuVotes : 0}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.aspirantsSection}>
                <View style={styles.aspirant}>
                  <Image source={require('../assets/aspirantImgs/Atiku.jpg')} style={styles.aspirantImg} />
                  <View style={styles.aspirantDetails}>
                    <View>
                      <Text style={styles.aspirantName}>Atiku</Text>
                      <Text style={styles.aspirantName}>Abubakar</Text>
                    </View>
                    <Image source={require('../assets/partyLogos/PDP.png')} style={styles.logoImg}/>
                  </View>
                  <TouchableOpacity style={styles.voteBtn} onPress={() => handleVoteCount('atikuVotes')} activeOpacity={0.7}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Votes: {votes.atikuVotes > 0 ? votes.atikuVotes : 0}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.aspirant}>
                  <Image source={require('../assets/aspirantImgs/Kwankwaso.jpg')} style={styles.aspirantImg} />
                  <View style={styles.aspirantDetails}>
                    <View>
                      <Text style={styles.aspirantName}>Rabiu</Text>
                      <Text style={styles.aspirantName}>Kwankwaso</Text>
                    </View>
                    <Image source={require('../assets/partyLogos/NNPP.png')} style={styles.logoImg}/>
                  </View>
                  <TouchableOpacity style={styles.voteBtn} onPress={() => handleVoteCount('kwankwasoVotes')} activeOpacity={0.7}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Votes: {votes.kwankwasoVotes > 0 ? votes.kwankwasoVotes : 0}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.checkWinnerSection}>
                <TouchableOpacity style={styles.checkBtn} activeOpacity={0.7} onPress={() => {handleElectionWinner(), updateElectionData()}}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Check Winner</Text>
                </TouchableOpacity>
            </View>

            {checkWinner === true ? (
            <View style={styles.declareWinner}>
              <View style={{width: '90%', alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={winnerImg} style={{width: 150, height: 150, borderRadius: 75}}/>
                <Text style={{marginLeft: 32, fontSize: 24, fontWeight: 'bold', color: 'white'}}>WINNER</Text>
              </View>
              <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
                <Text style={styles.congratsMessage}>Congratulation <Text style={{fontWeight: 'bold'}}>Mr. {winnerName}</Text> on your election as the president of the Federal Republic of Nigeria.</Text>
              </View>
            </View>
            ) : null}

            {checkWinner ? (
            <View style={styles.barChartCon}>
              <Text style={{fontSize: 18, fontWeight: '500', marginLeft: 12, color: "#28231D", marginBottom: 20}}>Election Stats</Text>
              <Svg width={chartWidth} height={chartHeight} style={{backgroundColor: 'white', alignSelf: 'center'}}>
                {verticalLabels.map((label, index) => (
                  <SvgText
                    key={index}
                    x={chartPadding - 5}
                    y={chartHeight - chartPadding - index * (chartHeight - 2 * chartPadding) / (verticalLabels.length - 1)}
                    fill='black'
                  >{label}</SvgText>
                ))}

                {electionData.map((item, index) => (
                  <Rect 
                    key={index}
                    x={50 + index * (chartWidth - 2 * chartPadding) / 3.88}
                    y={chartHeight - chartPadding - (item.value / 100) * (chartHeight - 2 * chartPadding)}
                    width={(chartWidth - 10 * chartPadding) / electionData.length}
                    height={(item.value / 100) * (chartHeight - 2 * chartPadding)}
                    fill="#3498db"
                  />
                ))}

                {horizontalLabels.map((label, index) => (
                  <SvgText
                    key={index}
                    x={chartPadding + index * (chartWidth - 2 * chartPadding) / 4 + (chartWidth - 2 * chartPadding) / (2 * 3)}
                    y={chartHeight - chartPadding + 15}
                    fill='black'
                    textAnchor='middle'
                  >{label}</SvgText>
                ))}
              </Svg>
            </View>
            ): null}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgBackground: {
    flex: 1,
  },
  electionHeader: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aspirantsCon: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
    gap: 15,
  },
  aspirantsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  aspirant: {
    width: 153,
    height: 275,
    backgroundColor: 'green',
    borderRadius: 16.5,
  },
  aspirantImg: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  logoImg: {
    width: 40,
    height: 40
  },
  aspirantDetails: {
    flexDirection: 'row', 
    width: '90%', 
    alignSelf: 'center', 
    justifyContent: 'space-between',
    marginTop: 12
  },
  aspirantName: {
    fontSize: 15.5,
    fontWeight: 'bold',
    color: 'white'
  },
  voteBtn: {
    backgroundColor: '#000',
    marginTop: 15,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    paddingVertical: 7,
    borderRadius: 5
  },
  checkWinnerSection: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30
  },
  checkBtn: {
    backgroundColor: '#000',
    paddingVertical: 14,
    width: '50%',
    alignItems: 'center',
    borderRadius: 7
  },
  declareWinner: {
    backgroundColor: 'green',
    height: 300,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  congratsMessage: {
    color: 'white',
    fontSize: 15,
    lineHeight: 25
  },
  barChartCon: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 40
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

