import { View, Text, StyleSheet, Image, ImageSourcePropType} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState } from "react";

interface StatsCardProps {
  imagePath: ImageSourcePropType;
  title: string;
  subtitle: number;
}
export const StatsCard: React.FC<StatsCardProps> = ({ imagePath, title,subtitle }) => {
  const foodData = [
    { name: 'Banana', calories: 89 },
    { name: 'Fresa', calories: 32 },
    { name: 'Mango', calories: 60 },
    { name: 'Manzana', calories: 52 },
    { name: 'Naranja', calories: 47 },
    { name: 'Piña', calories: 50 },
    { name: 'Sandía', calories: 30 },
  ];
  return (
    <LinearGradient
      colors={["#F97316", "#EA580C"]} // orange-500 to orange-600
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Steps Counter and Circular Progress */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepsContent}>
            <Image style={styles.stepsCount} source={imagePath}/>
            <Text style={styles.stepsLabel}>{title}</Text>
          </View>
          {/* Calories */}
          <View style={styles.statColumn}>
            <View style={styles.caloriesContainer}>
              {/* Circular Icon */}
              <View style={styles.circleIcon}>
              <AnimatedCircularProgress
            size={64}
            width={5}
            fill={subtitle.toFixed(2)*100}
            arcSweepAngle={240}
            tintColor="#00e0ff"
            duration={2000}
            lineCap='round'
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
            rotation={200}
          />
              </View>
              <View style={styles.caloriesText}>
                <Text style={styles.statValue}>{subtitle.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Probabilidad</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Warning Text */}
        
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Steps Goal */}
          <View style={styles.statColumn}>
            <Text style={styles.statValue}>
              {foodData.find(food => food.name === title)?.calories || 'N/A'}
            </Text>
            <Text style={styles.statLabel}>Calorias por porcion</Text>
          </View>

        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    minWidth: 350,
    borderRadius: 24,
    margin: 16,
    overflow: "hidden",
  },
  content: {
    padding: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepsContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepsCount: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  stepsLabel: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  warningText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  statColumn: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  caloriesContainer: {
    alignItems: "flex-end",
  },
  circleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
    marginBottom: 8,
  },
  caloriesText: {
    alignItems: "flex-end",
  },
});

export default StatsCard;

