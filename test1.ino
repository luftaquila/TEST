#include "pitches.h"
int speakPin = 9;
char notes[] = { 'c', 'd', 'e', 'f', 'g', 'a' };
char melodies[] = "eggeggaaaaaggggffffeeeeegggeggaaeegfffeeeeddggc";
int pitches[] = { NOTE_C5, NOTE_D5, NOTE_E5, NOTE_F5, NOTE_G5, NOTE_A5 };
int duration[] = { 4, 4, 2, 4, 4, 2, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1 };
int noteCount = sizeof(notes) / sizeof(notes[0]);
int melodyCount = sizeof(melodies) / sizeof(melodies[0]);

void setup() {}
void loop()
{
	for (int index = 0; index < melodyCount; index++)
	{
		int noteduraion = 1200 / duration[index];
		playNote(melodies[index], noteduraion);
		if (duration[index] == 1) { delay(1000); }
	}
	delay(2000);
}
void playNote(char melody, int duration)
{
	for (int i = 0; i < noteCount; i++) {
		if (notes[i] == melody) { tone(speakerPin, pitches[i], duration); } }
	delay(duration*1.30);
}
