import cv2
import mediapipe as mp
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import numpy as np
import os

# Initialize MediaPipe
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

# Initialize the gesture recognizer
base_options = python.BaseOptions(model_asset_path='gesture_recognizer.task')
options = vision.GestureRecognizerOptions(base_options=base_options)
recognizer = vision.GestureRecognizer.create_from_options(options)

def process_image(image):
    # Convert the BGR image to RGB and process it with MediaPipe Hands
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)
    recognition_result = recognizer.recognize(mp_image)

    # Draw the hand annotations on the image
    annotated_image = image.copy()
    
    if recognition_result.hand_landmarks:
        for hand_landmarks in recognition_result.hand_landmarks:
            hand_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
            hand_landmarks_proto.landmark.extend([
                landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) 
                for landmark in hand_landmarks
            ])
            mp_drawing.draw_landmarks(
                annotated_image,
                hand_landmarks_proto,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())

    # Get the top gesture
    if recognition_result.gestures:
        top_gesture = recognition_result.gestures[0][0]
        print(recognition_result.gestures)
        gesture_text = f"{top_gesture.category_name} ({top_gesture.score:.2f})"
        
        # Display the gesture text
        cv2.putText(annotated_image, gesture_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    return annotated_image

def main():
    # Try to initialize the webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open camera.")
        print("Would you like to process a video file instead? (y/n)")
        choice = input().lower()
        if choice == 'y':
            print("Enter the path to your video file:")
            video_path = input()
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                print(f"Error: Could not open video file at {video_path}")
                return
        else:
            return

    while True:
        success, image = cap.read()
        if not success:
            print("End of video stream.")
            break

        processed_image = process_image(image)

        # Display the resulting frame
        cv2.imshow('MediaPipe Hands', processed_image)
        
        # Exit the program if 'q' is pressed
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

    cap.release()
    
    # Check if cv2.destroyAllWindows() is available
    if hasattr(cv2, 'destroyAllWindows'):
        cv2.destroyAllWindows()
    else:
        print("Note: cv2.destroyAllWindows() is not available in your OpenCV installation.")

if __name__ == "__main__":
    main()