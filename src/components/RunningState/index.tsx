'use client';

import { LocationIcon, RightGreenArrow, SwipeIcon } from '@/assets';
import RunningStateType from '@/types/runningStateType';
import { formatDate } from '@/utils';

import React, { useState } from 'react';

import ShoesBox from '../ShoesBox';
import * as S from './style';

const RunningState = ({
  location,
  distance,
  title,
  date,
  level,
  totalDistance,
  longestDistance,
  shortestDistance,
  todayRunning,
}: RunningStateType) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;

    setDragX((prev) => {
      const newDragX = Math.max(-200, Math.min(200, prev + deltaX));
      setStartX(clientX);
      return newDragX;
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (dragX > 110) {
      setDragX(200);
    } else if (dragX < -110) {
      setDragX(-200);
    } else {
      setDragX(0);
    }
  };

  const historyData = [
    { title: '총 거리', value: `${totalDistance}km` },
    { title: '가장 많이 달린', value: `${longestDistance}km` },
    { title: '가장 적게 달린', value: `${shortestDistance ?? 0}km` },
  ];

  const isRightPosition = dragX > 110;

  return (
    <S.Wrapper>
      <S.TitleText dragX={dragX}>
        {isRightPosition ? '신청 목록' : '런닝 레벨'}
      </S.TitleText>
      <S.RunningStateContainer>
        <S.SwipeContainer>
          <S.SwipeBox>
            {isRightPosition && (
              <S.AppearContent>
                <S.LocationContainer>
                  <S.LocationBox>
                    <LocationIcon />
                    <S.LocationText>{location}</S.LocationText>
                  </S.LocationBox>
                  <S.IntendKM>{distance}KM</S.IntendKM>
                </S.LocationContainer>
                <S.JoinTextBox>
                  <S.JoinTitle>{title}에서 런닝 모집</S.JoinTitle>
                </S.JoinTextBox>
                <S.DateText>{formatDate(date)}</S.DateText>
              </S.AppearContent>
            )}
            <S.LeftContent
              onMouseDown={handleDragStart}
              onMouseMove={isDragging ? handleDragMove : undefined} // 드래그 중일 때만 핸들러 실행
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={isDragging ? handleDragMove : undefined}
              onTouchEnd={handleDragEnd}
              dragX={dragX}
              isRightPosition={isRightPosition}
            >
              {isRightPosition ? (
                <S.RunningList>
                  <S.RunningListBox>
                    <S.TodayRunningText>오늘 런닝</S.TodayRunningText>
                    <S.ListContainer>
                      {todayRunning.map((runningItem, index) => (
                        <S.ListContent key={index}>{runningItem}</S.ListContent>
                      ))}
                    </S.ListContainer>
                  </S.RunningListBox>
                  <S.SeeMoreButton>
                    <S.SeeMoreText>더보기</S.SeeMoreText>
                    <RightGreenArrow />
                  </S.SeeMoreButton>
                </S.RunningList>
              ) : (
                <S.LeftBox>
                  <S.LVImgBox>
                    <ShoesBox />
                  </S.LVImgBox>
                  <S.LVText>Lv {level ?? 0}</S.LVText>
                </S.LeftBox>
              )}
            </S.LeftContent>
            <S.RunningHistoryBox>
              {historyData.map((item, index) => (
                <S.HistoryContent key={index} isRightPosition={isRightPosition}>
                  {!isRightPosition && (
                    <>
                      <S.HistoryTitle>{item.title}</S.HistoryTitle>
                      <S.KMText>{item.value}</S.KMText>
                    </>
                  )}
                </S.HistoryContent>
              ))}
            </S.RunningHistoryBox>
          </S.SwipeBox>
        </S.SwipeContainer>

        <S.SwipeHintBox>
          <S.SwipeText>옆으로 드래그해서 신청목록 확인</S.SwipeText>
          <SwipeIcon />
        </S.SwipeHintBox>
      </S.RunningStateContainer>
    </S.Wrapper>
  );
};

export default RunningState;
