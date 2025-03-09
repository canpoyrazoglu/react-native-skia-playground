import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../util/navigation/Navigation';

export function useNavigate(){
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
}