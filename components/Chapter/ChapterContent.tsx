"use client"

import { PageTypes } from "@root/@types/shared.types";
import { Question } from "./QuestionTypes";
import { Narrator } from "./Narrator";
import { SuccessScreen } from "./ScreenTypes/SuccessScreen";
import { Title } from "./ScreenTypes/Title";
import { useQuestionFlow } from "@root/context/QuestionFlowContext";

export const ChapterContent = () => {
    const {currentPage} = useQuestionFlow();
    if (!currentPage) return null;

    return (
        <>
            { currentPage.pageType === PageTypes.title && (
                <Title
                    title={currentPage.title} 
                    subtitle={currentPage.subtitle} 
                />
            ) }
            { currentPage.pageType === PageTypes.question && (
                <>
                    <Question questionPage={currentPage} />
                    <Narrator 
                        avatarImage={currentPage.avatarImage} 
                        small
                    />
                </>
            ) }
            { (currentPage.pageType === PageTypes.narrator) && (
                <Narrator 
                    avatarImage={currentPage.avatarImage} 
                    avatarText={currentPage.avatarText} 
                />
            ) }
            { currentPage.pageType === PageTypes.success && (
                <SuccessScreen
                    title={currentPage.title}
                    subtitle={currentPage.subtitle}
                    avatarImage={currentPage.avatarImage}
                />
            ) }
        </>
    )

}